const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
// Route để hiển thị danh sách các món ăn trên trang chủ
router.get('/', foodController.getAllFoods);

// Route để lấy một food theo ID
router.get('/:id', foodController.getFoodById);

// Route để tạo mới một food
router.post('/', foodController.createFood);

// Route để cập nhật một food theo ID
router.put('/:id', foodController.updateFood);

// Route để xóa một food theo ID
router.delete('/:id', foodController.deleteFood);

module.exports = router;
