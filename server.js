// server.js
// Express backend for the simple login app.
// - Serves static files
// - Validates input (presence + username type)
// - Returns:
//   400 for missing fields or invalid username (client error)
//   401 for bad credentials (generic message)
//   200 for success

const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from project root and /public folder
app.use(express.static(path.join(__dirname)));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Demo user: admin / 1234
// passwordHash is bcrypt hash for '1234'
const users = [
  { id: 1, username: 'admin', passwordHash: '$2a$10$pR2/kT77QnIZzsI4wN7rkurWRww56L7k5yhp52oKH8O6BuEJz5kTi' }
];

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};

  // Server-side validation: require both fields
  if (!username || !password) {
    // 400 Bad Request - message matches client-side validation wording
    return res.status(400).json({ ok: false, message: 'Please enter both username and password' });
  }

  // NEW: Reject numeric-only or non-string usernames as invalid input (400).
  // Rationale: username must be a non-numeric string (numbers-only should be treated as invalid, not "wrong credentials").
  // - If client sends a number type (e.g., { username: 123 }), typeof username !== 'string' will catch it.
  // - If client sends a string of digits (e.g., "12345") we also treat that as invalid.
  if (typeof username !== 'string' || /^\d+$/.test(username)) {
    // 400 Bad Request - explicit invalid username message (client should display this verbatim)
    return res.status(400).json({ ok: false, message: 'Please enter a valid username' });
  }

  // Find the user by username
  const user = users.find(u => u.username === username);
  if (!user) {
    // 401 Unauthorized - intentionally generic message (do not reveal which part is wrong)
    return res.status(401).json({ ok: false, message: 'username or password is incorrect' });
  }

  // Compare provided password with stored bcrypt hash
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    // 401 Unauthorized - same generic message for wrong password
    return res.status(401).json({ ok: false, message: 'username or password is incorrect' });
  }

  // Successful login
  return res.json({ ok: true, message: 'Login Successful' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app;
