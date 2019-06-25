import React from 'react';
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

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
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

export default App => {
    const ApolloWrapper = () => (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <App />
            </ApolloHooksProvider>
        </ApolloProvider>
    );
    return ApolloWrapper;
};
