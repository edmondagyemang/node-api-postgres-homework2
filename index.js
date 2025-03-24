const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./queries');

app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Welcome to my API 🎉');
});

// ✅ Users routes
app.get('/users', db.getUsers);           // all users
app.get('/users/:id', db.getUserById);    // user by ID
app.post('/users', db.createUser);        // Create new user
app.put('/users/:id', db.updateUser);     // Update user
app.delete('/users/:id', db.deleteUser);  // Delete user

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
