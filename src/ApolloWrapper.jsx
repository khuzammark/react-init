import React from "react";
import PropTypes from "prop-types";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat } from "apollo-link";
import { Router } from "react-router-dom";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { HttpLink } from "apollo-link-http";
import { createBrowserHistory } from "history";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { StripeProvider } from "react-stripe-elements";
import introspectionQueryResultData from "./fragmentTypes.json";
import { ConnectedLoginMiddleware } from "contexts/UserContext";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ROOT,
  credentials: "include"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token") || null;
  if (token) {
    operation.setContext({
      headers: {
        authorization: `JWT ${token}`
      }
    });
  }
  return forward(operation);
});

const hist = createBrowserHistory();

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache
});

function ApolloWrapper(App) {
  return () => (
    <Router history={hist}>
      <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <ConnectedLoginMiddleware>
              <App />
            </ConnectedLoginMiddleware>
          </ApolloHooksProvider>
        </ApolloProvider>
      </StripeProvider>
    </Router>
  );
}

ApolloWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ApolloWrapper;
