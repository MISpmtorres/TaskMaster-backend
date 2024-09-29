const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password); // Use the static signup method
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ token }); // Respond with the token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); // Use the static login method
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ token }); // Respond with the token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
