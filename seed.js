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
    // Xóa dữ liệu cũ trong các collections
    console.log('Deleting existing data...');
    await Account.deleteMany({});
    await Cart.deleteMany({});
    await Category.deleteMany({});
    await Food.deleteMany({});
    await Item.deleteMany({});
    await Order.deleteMany({});
    console.log('All existing data deleted.');

    // Tạo account mẫu
    const account1 = await Account.create({
      username: 'john_doe',
      password: 'password123',
      phone: '123456789',
      address: '123 Main Street',
      role: 'user',
    });

    const account2 = await Account.create({
      username: 'jane_smith',
      password: 'securepassword',
      phone: '987654321',
      address: '456 Market Street',
      role: 'admin',
    });

    // Tạo categories mẫu
    const category1 = await Category.create({
      name: 'Beverages',
      img: 'https://images.unsplash.com/photo-1628200558926-463e8390113d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });

    const category2 = await Category.create({
      name: 'Fast Food',
      img: 'https://images.unsplash.com/photo-1616696269042-7a27b57a6808?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });

    const category3 = await Category.create({
      name: 'Desserts',
      img: 'https://images.unsplash.com/photo-1702742322469-36315505728f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });

    // Tạo foods mẫu
    const food1 = await Food.create({
      name: 'Coca-Cola',
      price: 1.5,
      img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '123 Beverage Street',
      category_id: category1._id,
    });

    const food2 = await Food.create({
      name: 'Pepsi',
      price: 1.4,
      img: 'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '124 Beverage Street',
      category_id: category1._id,
    });

    const food3 = await Food.create({
      name: 'Burger',
      price: 5.0,
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '321 Fast Food Avenue',
      category_id: category2._id,
    });

    const food4 = await Food.create({
      name: 'French Fries',
      price: 2.5,
      img: 'https://images.unsplash.com/photo-1627662168223-7df99068099a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '322 Fast Food Avenue',
      category_id: category2._id,
    });

    const food5 = await Food.create({
      name: 'Chocolate Cake',
      price: 4.0,
      img: 'https://images.unsplash.com/photo-1586985289906-406988974504?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '456 Dessert Street',
      category_id: category3._id,
    });

    // Tạo carts mẫu
    const cart1 = await Cart.create({
      is_order: false,
      account_id: account1._id,
    });

    const cart2 = await Cart.create({
      is_order: true,
      account_id: account2._id,
    });

    // Tạo items mẫu
    const item1 = await Item.create({
      food_id: food1._id,
      cart_id: cart1._id,
      quantity: 2,
    });

    const item2 = await Item.create({
      food_id: food3._id,
      cart_id: cart1._id,
      quantity: 1,
    });

    const item3 = await Item.create({
      food_id: food5._id,
      cart_id: cart2._id,
      quantity: 3,
    });

    // Tạo orders mẫu
    const order1 = await Order.create({
      customer: account1.username,
      address: account1.address,
      phone: account1.phone,
      total_money: 8.0,
      payment_method: 'Credit Card',
      is_payment: true,
      status: 'Completed',
      cart_id: cart1._id,
    });

    const order2 = await Order.create({
      customer: account2.username,
      address: account2.address,
      phone: account2.phone,
      total_money: 12.0,
      payment_method: 'Cash',
      is_payment: false,
      status: 'Pending',
      cart_id: cart2._id,
    });

    console.log('Sample data created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
});
