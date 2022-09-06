import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const httpLink = createHttpLink({
  uri: "https://flexible-iguana-14.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "K25YUmXNMwTYL85YWI8KwYwE23T7WUc76cf2lm2islDapffnGRuxFbGqHfd1A8oA";
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <Auth0Provider
    domain="dev-7-8i89hb.us.auth0.com"
    clientId="yABzJ5U03ynSjSijYOEWkwymAt84CFDS"
    redirectUri="https://aha-login.herokuapp.com"
    //Note- freeze above and unfreeze below when going from production to local testing
    /*     redirectUri="http://localhost:3000/home"*/
    audience="https://dev-7-8i89hb.us.auth0.com/api/v2/"
    cacheLocation={"localstorage"}
    /*setting cacheLocation to {"localstorage"} allows authorized user information to be saved in the browser via a cookie */
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  /* ApolloProvider allows access to GraphQL*/
  /*Auth0Provider allows access to Auth0-related modules and functionality*/

  document.getElementById("root")
);

reportWebVitals();
