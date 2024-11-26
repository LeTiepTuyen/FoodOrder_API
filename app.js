const express = require('express');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./configs/database');
require('dotenv').config();
const session = require('express-session');
const checkAuthSession = require('./middlewares/authSession');

const accountRoutes = require('./routers/account.routes');
const cartRoutes = require('./routers/cart.routes');
const categoryRoutes = require('./routers/category.routes');
const foodRoutes = require('./routers/food.routes');
const orderRoutes = require('./routers/order.routes');
const authRoutes = require('./routers/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'A3!sd&8#bXe$T0^XoL@nV91',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware kiểm tra session
app.use(checkAuthSession);

// Kết nối MongoDB
connectDB();

// Routes
app.use('/cart', cartRoutes); // Add /cart as the base path
app.use(authRoutes); // Login và Register
app.use('/api/accounts', accountRoutes);
app.use('/foods', foodRoutes);
app.use('/', foodRoutes); // Trang chính

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Trang bạn yêu cầu không tồn tại.' });
});

// Xử lý lỗi server
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).render('error', { message: 'Đã xảy ra lỗi máy chủ.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
