const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Hiển thị giỏ hàng của tài khoản hiện tại
router.get('/', cartController.getCartForAccount); // Base path is already /cart

// Chỉnh sửa số lượng item trong giỏ hàng
router.post('/edit/:id', cartController.editCartItem);

// Xóa item khỏi giỏ hàng
router.delete('/delete/:id', cartController.deleteCartItem);

// Add item to cart
router.post('/add', cartController.addFoodItemToCart);

module.exports = router;
