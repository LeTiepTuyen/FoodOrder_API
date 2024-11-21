require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs
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

    // Hàm hash mật khẩu
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    // Tạo account mẫu với mật khẩu đã được hash
    const account1 = await Account.create({
      username: 'hungnguyen',
      password: await hashPassword('password123'), // Hash mật khẩu
      phone: '123456789',
      address: '123 Main Street',
      role: 'user',
    });

    const account2 = await Account.create({
      username: 'tuyentieple',
      password: await hashPassword('securepassword'), // Hash mật khẩu
      phone: '987654321',
      address: '456 Market Street',
      role: 'admin',
    });

    // Tạo categories mẫu
    const category1 = await Category.create({
      name: 'Beverages',
      img: 'URL-to-image',
    });

    const category2 = await Category.create({
      name: 'Fast Food',
      img: 'URL-to-image',
    });

    const category3 = await Category.create({
      name: 'Desserts',
      img: 'URL-to-image',
    });

    const category4 = await Category.create({
      name: 'Healthy',
      img: 'URL-to-image',
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

    const food6 = await Food.create({
      name: 'Ice Cream Sundae',
      price: 3.5,
      img: 'https://images.unsplash.com/photo-1641443085529-f79e3f0ca3ab?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '457 Dessert Street',
      category_id: category3._id,
    });

    const food7 = await Food.create({
      name: 'Salad Bowl',
      price: 4.5,
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '789 Healthy Lane',
      category_id: category4._id,
    });

    const food8 = await Food.create({
      name: 'Fruit Smoothie',
      price: 3.0,
      img: 'https://images.unsplash.com/photo-1514994960127-ed3ef9239d11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '790 Healthy Lane',
      category_id: category4._id,
    });

    const food9 = await Food.create({
      name: 'Veggie Wrap',
      price: 5.5,
      img: 'https://images.unsplash.com/photo-1542128722-d6fe34923abc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      address: '791 Healthy Lane',
      category_id: category4._id,
    });

     // Tạo carts mẫu
     const cart1 = await Cart.create({ is_order: false, account_id: account1._id, items: [] });
     const cart2 = await Cart.create({ is_order: false, account_id: account2._id, items: [] });

    // Tạo items mẫu và liên kết với carts
    const item1 = await Item.create({ food_id: food1._id, cart_id: cart1._id, quantity: 2 });
    const item2 = await Item.create({ food_id: food2._id, cart_id: cart1._id, quantity: 1 });
    const item3 = await Item.create({ food_id: food3._id, cart_id: cart2._id, quantity: 3 });
    const item4 = await Item.create({ food_id: food4._id, cart_id: cart2._id, quantity: 1 });
    const item5 = await Item.create({ food_id: food5._id, cart_id: cart1._id, quantity: 1 });
    const item6 = await Item.create({ food_id: food6._id, cart_id: cart2._id, quantity: 2 });
    const item7 = await Item.create({ food_id: food7._id, cart_id: cart1._id, quantity: 1 });
    const item8 = await Item.create({ food_id: food8._id, cart_id: cart2._id, quantity: 1 });
    const item9 = await Item.create({ food_id: food9._id, cart_id: cart1._id, quantity: 2 });

    // Cập nhật items vào carts
    await Cart.findByIdAndUpdate(cart1._id, { $push: { items: [item1._id, item2._id, item5._id, item7._id, item9._id] } });
    await Cart.findByIdAndUpdate(cart2._id, { $push: { items: [item3._id, item4._id, item6._id, item8._id] } });

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
