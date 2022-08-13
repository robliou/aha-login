import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
/* import LogRocket from 'logrocket';
//disabled any references to logrocket
 */ import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

// IF you want to enable/disable dev tools in different enviroments
const devTools = localStorage.getItem("apolloDevTools") || false;

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const authMiddleware = setContext(async (_, { headers, ...context }) => {
    const token = await getAccessTokenSilently();
    //Optional if the ti
    if (typeof Storage !== "undefined") {
      localStorage.setItem("token", token);
    }

    console.log("Network ID:");
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...context,
    };
  });

  /**
   * Adding fix to improve logRocket recording
   * https://docs.logrocket.com/docs/troubleshooting-sessions#apollo-client
   */

  const fetcher = (...args) => {
    return window.fetch(...args);
  };

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log("graphql error");
        }
        if (networkError) {
          console.log("networkerror");
        }
      }),
      authMiddleware,
      new RetryLink(),
      new BatchHttpLink({
        uri: `https://flexible-iguana-14.hasura.app/v1/graphql`,
        fetch: fetcher,
      }),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
