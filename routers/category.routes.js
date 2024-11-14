const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Route để lấy tất cả categories
router.get('/', categoryController.getAllCategories);

// Route để lấy một category theo ID
router.get('/:id', categoryController.getCategoryById);

// Route để tạo mới một category
router.post('/', categoryController.createCategory);

// Route để cập nhật một category theo ID
router.put('/:id', categoryController.updateCategory);

// Route để xóa một category theo ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
