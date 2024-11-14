const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

// Route để hiển thị form đăng ký (định nghĩa trước route /:id)
router.get('/register', (req, res) => {
  res.render('register'); // render ra file register.ejs trong thư mục views
});

// Route để xử lý việc đăng ký account (POST)
router.post('/register', accountController.createAccount);

// Route để lấy tất cả accounts
router.get('/', accountController.getAllAccounts);

// Route để lấy một account theo ID
router.get('/:id', accountController.getAccountById);

// Route để cập nhật một account theo ID
router.put('/:id', accountController.updateAccount);

// Route để xóa một account theo ID
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
