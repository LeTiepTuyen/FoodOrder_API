const Account = require('../models/account.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký user mới
exports.register = async (req, res) => {
  try {
    const { username, password, phone, address, role } = req.body;

    // Kiểm tra nếu username đã tồn tại
    const existingUser = await Account.findOne({ username });
    if (existingUser) {
      return res.status(400).render('register', { message: 'Username đã tồn tại' });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new Account({
      username,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    await newUser.save();
    // Render thông báo thành công và chuyển hướng sau 2 giây
    res.status(201).render('register', { message: 'Registration successful!', redirect: true });
  } catch (error) {
    res.status(500).render('register', { message: `Error: ${error.message}` });
  }
};




// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

      // Tìm user trong database
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Sai thông tin đăng nhập' });
    }

    // Kiểm tra mật khẩu
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).render('login', { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    
    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    // Lưu toàn bộ object user vào session
    req.session.user = user;

    res.redirect('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).render('error', { message: 'Đã xảy ra lỗi khi đăng nhập' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Account.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).render('login', { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Lưu toàn bộ object user vào session
    req.session.user = user;

    res.redirect('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).render('error', { message: 'Đã xảy ra lỗi khi đăng nhập' });
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Lỗi khi hủy session:', err);
      return res.status(500).json({ message: 'Đăng xuất không thành công' });
    }
    res.redirect('/');
  });
};