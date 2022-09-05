# aha-login
This is the README.md for aha-login, a full-stack app created by Robert Liou as part of the full-stack engineer examination as required by Aha. Requirements for building are listed here: https://docs.google.com/document/d/15tA1qlVOg14cmpX0DbIPPnUQa9GYlSXcb9haRCojVEU/edit.
Aha-login is currently deployed at: https://aha-login.herokuapp.com.

It is composed of a React front-end and a Node.js backend. Calls to Auth0 are made from the Node back-end and feature the acquisition of a specially obtained M2M (Machine-to-Machine) token. Both front- and back-end must be deployed in order for this app to run correctly. The authorization is handled mainly by Auth0, while the origin of all calls comes from the specially-built React front-end. In addition, user metadata, specifically an editable nickname, is handled by a PostgresQL database hosted by ElephantSQL and accessed via a GraphQL setup featuring ApolloQL and Hasura.

Key documentation to refer to for handling of the Management API and GraphQL database:
Auth0 API-
https://auth0.com/docs/api/management/v2

GraphQL Explorer-
https://www.apollographql.com/docs/studio/explorer/explorer/

SwaggerHub API documentation for Aha-Login-
https://app.swaggerhub.com/apis/flashrob01/Aha-Login-API/1.0.0

To run this file locally:

1) Clone this app
2) Setup an M2M app account with Auth0
3) Set up an .env file in both the /react-ui and /server folders.
4) Add your environment variables as obtained from your M2M app into https://www.auth0.com.
5) Change the redirect URL in /react-ui/src/index.js to "http://localhost:3000"
6) Use npm run in both the /react-ui and /server folders
