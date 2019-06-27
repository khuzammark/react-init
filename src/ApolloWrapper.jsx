import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { HttpLink } from 'apollo-link-http';
import {
    InMemoryCache,
    IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import introspectionQueryResultData from './fragmentTypes.json';

const httpLink = new HttpLink({
    // todo: update with env vars.
    uri: "https://localhost:8003/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('token') || null;
    if (token) {
        operation.setContext({
            headers: {
                authorization: `JWT ${token}`
            }
        });
    }
    return forward(operation);
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache
});

function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                {children}
            </ApolloHooksProvider>
        </ApolloProvider>
    );
}

ApolloWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default ApolloWrapper;
