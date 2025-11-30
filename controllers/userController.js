const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Signup attempt:', { username, email }); // Debug log

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email); // Debug log
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('User saved successfully:', user._id); // Debug log

    res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id,
    });
  } catch (error) {
    console.error('Signup Error:', error); // Detailed error log
    res.status(500).json({ status: false, message: 'Server error: ' + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token: token,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

module.exports = { signup, login };
