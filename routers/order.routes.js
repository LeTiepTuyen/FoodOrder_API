const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Route để lấy tất cả orders
router.get('/', orderController.getAllOrders);

// Route để lấy một order theo ID
router.get('/:id', orderController.getOrderById);

// Route để tạo mới một order
router.post('/', orderController.createOrder);

// Route để cập nhật một order theo ID
router.put('/:id', orderController.updateOrder);

// Route để xóa một order theo ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
