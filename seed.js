require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./configs/database');

// Import các models
const Account = require('./models/account.model');
const Cart = require('./models/cart.model');
const Category = require('./models/category.model');
const Food = require('./models/food.model');
const Item = require('./models/item.model');
const Order = require('./models/order.model');

// Kết nối tới database
connectDB().then(async () => {
  try {
    // Tạo tài liệu mẫu
    const account = await Account.create({
      username: 'testuser',
      password: 'testpassword',
      phone: '123456789',
      address: '123 Test Street',
      role: 'user'
    });

    const cart = await Cart.create({
      is_order: false,
      account_id: account._id
    });

    const category = await Category.create({
      name: 'Beverages',
      img: 'category-image-url'
    });

    const food = await Food.create({
      name: 'Test Food',
      price: 10.99,
      img: 'food-image-url',
      address: 'Food Address',
      category_id: category._id
    });

    const item = await Item.create({
      food_id: food._id,
      cart_id: cart._id,
      quantity: 2
    });

    const order = await Order.create({
      customer: 'Test Customer',
      address: 'Order Address',
      phone: '987654321',
      total_money: 21.98,
      payment_method: 'Cash',
      is_payment: true,
      status: 'Pending',
      cart_id: cart._id
    });

    console.log('Sample data created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
});
