const { Pool } = require("pg");
const pool = require("./db");

const getUsers = (request, response) => {
  pool.query("SELECT * FROM names ORDER BY nickname ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const user_id = parseInt(request.params.user_id);

  pool.query(
    "SELECT * FROM names WHERE nickname = $1, user_id = $2, email =$3",
    [nickname, user_id, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const email = request.body;

  pool.query(
    "INSERT INTO names (nickname, user_id, email) VALUES ($1, $2, $3)",
    //Rows cannot be split in this language!
    [nickname, user_id, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with nickname: ${nickname}`);
    }
  );
};
//This used to say ${result.insert.Id}; I have NO idea where the heck that came from!

const updateUser = (request, response) => {
  /*   const user_id = parseInt(request.params.user_id);
   */ const { nickname, user_id, email } = request.body;

  pool.query(
    "UPDATE names SET nickname = $1, user_id = $2, email = $3",
    [nickname, user_id, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with nickname: ${nickname}`);
    }
  );
};

//it would appear that this put command takes in id and then allows you to update name/ email / etc.
//https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/comment-page-1/#comments

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
