const express = require('express');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./configs/database');

// Sửa lại các đường dẫn đến thư mục routers
const accountRoutes = require('./routers/account.routes');
const cartRoutes = require('./routers/cart.routes');
const categoryRoutes = require('./routers/category.routes');
const foodRoutes = require('./routers/food.routes');
const orderRoutes = require('./routers/order.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Thiết lập EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cung cấp file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối tới MongoDB
connectDB();

// Định nghĩa routes
app.use('/api/accounts', accountRoutes);
app.use('/', foodRoutes);
// app.use('/api/carts', cartRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/orders', orderRoutes);

// Cấu hình cổng và chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
