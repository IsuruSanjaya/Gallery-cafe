const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login User
// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        
        // Only send token and role in response
        res.status(200).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json(users); // Send the users as the response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
