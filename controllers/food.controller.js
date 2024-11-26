const Food = require('../models/food.model');
const Category = require('../models/category.model');

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('category_id');
    if (req.query.manage) {
      const categories = await Category.find();
      return res.render('food_manage', { foods, categories });
    }
    res.render('homepage', { foods, isLoading: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get food by ID and render detail page with related dishes
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category_id');
    if (!food) {
      return res.status(404).render('error', { message: 'Food not found' });
    }

    // Lấy danh sách các món ăn khác không trùng với món đang hiển thị
    const relatedFoods = await Food.find({ _id: { $ne: req.params.id } }).limit(3);

    res.render('detailpage', { food, relatedFoods });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};

// Create new food
exports.createFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.redirect('/foods/manage');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update food by ID
exports.updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.redirect('/foods/manage');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete food by ID
exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
