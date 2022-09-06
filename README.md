# aha-login
This is the README.md for aha-login, a full-stack app created by Robert Liou as part of the full-stack engineer examination as required by Aha. Requirements for the project are listed here: https://docs.google.com/document/d/15tA1qlVOg14cmpX0DbIPPnUQa9GYlSXcb9haRCojVEU/edit.
Aha-login is currently deployed at: https://aha-login.herokuapp.com.

It is composed of a ReactJS front-end and a Node.js backend. The authorization is handled mainly by Auth0, while the origin of all calls comes from the specially-built React front-end.  Calls to Auth0 are made from the Node back-end and feature the acquisition of a specially obtained M2M (Machine-to-Machine) token. In order to obtain user profile information and users statistics, a postgresQL database has been constructed to handle the information; it is hosted by Heroku. Therefore, both the front- and back-end must be deployed in order for this app to run correctly.  In addition, user metadata, specifically creation and updating of an editable nickname, is handled by a separate, specially-created ElephantSQL (PostgresQL) database, which is accessed via a GraphQL setup using ApolloQL and Hasura.

Key documentation to refer to for handling of the Management API and GraphQL database:
Auth0 Management API-
https://auth0.com/docs/api/management/v2

SwaggerHub API documentation for Aha-Login (user profile and users stats)-
https://app.swaggerhub.com/apis/flashrob01/Aha-Login-API/1.0.0

GraphQL Explorer-
https://cloud.hasura.io/project/2391abf8-87f2-46b7-bcd4-926f3853264f/console/api/api-explorer
The link above contains the GraphQL endpoint which an unauthorized user can use to test and make calls to the GraphQL database.
Note that user nicknames are stored in the 'Names' table.
As SwaggerAPI currently does not support GraphQL, instructions for how to access and use a GraphQL database are below:
https://www.apollographql.com/docs/studio/explorer/explorer/

To run this file locally:

1) Clone this app
2) Setup an M2M app account with Auth0
3) Set up an .env file in both the /react-ui and /server folders.
4) Add your environment variables as obtained from your M2M app into https://www.auth0.com as well as your .env file.
5) Change the redirect URL in /react-ui/src/index.js to "http://localhost:3000"
6) Use npm run in both the /react-ui and /server folders
