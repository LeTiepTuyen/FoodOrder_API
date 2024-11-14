const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Route để lấy tất cả carts
router.get('/', cartController.getAllCarts);

// Route để lấy một cart theo ID
router.get('/:id', cartController.getCartById);

// Route để tạo mới một cart
router.post('/', cartController.createCart);

// Route để cập nhật một cart theo ID
router.put('/:id', cartController.updateCart);

// Route để xóa một cart theo ID
router.delete('/:id', cartController.deleteCart);

module.exports = router;
