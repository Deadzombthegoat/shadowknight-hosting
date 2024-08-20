const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Assuming you have a User model defined in /models/User.js

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { email: usernameOrEmail },
                { username: usernameOrEmail }
            ]
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;