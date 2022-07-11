const express = require("express");
const usersRouter = express.Router();

var pg = require("pg");

const Pool = require("pg").Pool;
/* const pool = new Pool({
  user: "mcdyzqzn",
  host: "john.db.elephantsql.com",
  database: "mcdyzqzn",
  password: "tNZhAqSUXzbdvAGBM4QdN7kpQa-Rz3Js",
  //Above needs to get hidden on production!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  port: 5432,
}); */

const connectionString = process.env.PSQL_CONNECTION;

var client = new pg.Client(connectionString);

client.connect(function (err) {
  if (err) {
    return console.error("cound not connect to postgres", err);
  }
});

/* const pool = new Pool({
  connectionString,
}); */

usersRouter.getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY email ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY email ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  usersRouter,
  getUsers,
};
