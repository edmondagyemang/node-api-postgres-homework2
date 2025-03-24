
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ✅ GET all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching users');
    } else {
      res.status(200).json(results.rows);
    }
  });
};

// ✅ GET user by ID
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching user');
    } else {
      res.status(200).json(results.rows);
    }
  });
};

// ✅ POST new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).json(results.rows[0]);
    }
  });
};

// ✅ PUT (update) user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating user');
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};

// ✅ DELETE user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting user');
    } else {
      res.status(200).json({ message: 'User deleted', user: results.rows[0] });
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
