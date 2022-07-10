const express = require("express");
const usersRouter = express.Router();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "mcdyzqzn",
  host: "john.db.elephantsql.com",
  database: "mcdyzqzn",
  password: "tNZhAqSUXzbdvAGBM4QdN7kpQa-Rz3Js",
  port: 5432,
});

usersRouter.getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY user_id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  usersRouter,
};
