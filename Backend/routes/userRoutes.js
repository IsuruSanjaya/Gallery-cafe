const express = require('express');
const { registerUser, loginUser,getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);       // Route to get all users

module.exports = router;
