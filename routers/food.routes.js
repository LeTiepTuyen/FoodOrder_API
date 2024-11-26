const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const categoryController = require('../controllers/category.controller');

// Route để hiển thị trang quản lý món ăn
router.get('/manage', (req, res) => {
  req.query.manage = true;
  foodController.getAllFoods(req, res);
});

// Route để hiển thị danh sách các món ăn trên trang chủ
router.get('/', foodController.getAllFoods);

// Route để lấy một food theo ID
router.get('/:id', foodController.getFoodById);

// Route để tạo mới một food
router.post('/', foodController.createFood);

// Route để cập nhật một food theo ID
router.post('/:id', foodController.updateFood);

// Route để xóa một food theo ID
router.delete('/:id', foodController.deleteFood);

// Route để xử lý yêu cầu favicon.ico
router.get('/favicon.ico', (req, res) => res.status(204).end());

module.exports = router;
