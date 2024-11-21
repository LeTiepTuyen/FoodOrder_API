const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const Account = require('../models/account.model');
const bcrypt = require('bcryptjs');

// Route GET trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Route GET để render trang register
router.get('/register', (req, res) => {
  res.render('register', { message: null });
});

// Route POST để xử lý đăng ký
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);


// Route GET để xử lý đăng xuất và xóa session
router.get('/logout', authController.logout);

module.exports = router;
