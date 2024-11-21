module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user; // Thêm thông tin người dùng vào res.locals để sử dụng trong EJS
  } else {
    res.locals.user = null; // Nếu chưa đăng nhập, res.locals.user sẽ là null
  }
  next();
};
