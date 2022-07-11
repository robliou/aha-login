const express = require("express");
const usersRouter = express.Router();

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

const pool = new Pool({
  connectionString,
});

usersRouter.getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY email ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY email ASC", (error, results) => {
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
