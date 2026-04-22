const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.post('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router;
