require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./configs/database');
const accountController = require('./controllers/account.controller');

// Kết nối tới database
connectDB().then(async () => {
  try {
    console.log('Connected to MongoDB successfully');
    
    // Test logic của hàm trong account.controller.js
    // Mô phỏng request và response
    const req = {
      body: {
        username: 'testuser2',
        password: 'testpassword2',
        phone: '987654321',
        address: '456 Test Lane',
        role: 'user',
      }
    };

    const res = {
      status: (code) => {
        console.log('Status Code:', code);
        return {
          json: (data) => {
            console.log('Response Data:', data);
          }
        };
      }
    };

    console.log('Testing createAccount method...');
    await accountController.createAccount(req, res);
    console.log('Finished testing createAccount');

    // Thêm logic để test các phương thức khác (getAllAccounts, getAccountById, etc.)
  } catch (error) {
    console.error('Error testing account controller:', error);
  } finally {
    mongoose.connection.close(); // Đóng kết nối sau khi test xong
  }
});
