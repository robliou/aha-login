# aha-login
This is the README.md for aha-login, a full-stack app created as part of the full-stack engineer examination as required by Aha.
It is currently deployed at https://aha-login.herokuapp.com

It is composed of a React front-end and a Node.js backend. Calls to Auth0 are made from the Node back-end using a specially obtained M2M (Machine-to-Machine) token. Both front- and back-end must be deployed in order for this app to run correctly. The authorization is handled mainly by Auth0.

To run this file locally:

1) clone this app
2) setup an M2M app account with Auth0
3) set up an .env file in both the /react-ui and /server folders.
3a) add your environment variables as obtained from your M2M app in Auth0.
4) Change the redirect URL in /react-ui/src/index.js to "http://localhost:3000"
5) Use npm run in both the /react-ui and /server folders
