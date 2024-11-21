const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Lấy token từ header Authorization (định dạng Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Tách phần 'Bearer' ra để lấy token

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    // Xác thực và giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gắn thông tin người dùng vào request để sử dụng trong các middleware/route tiếp theo
    next(); // Chuyển tiếp request đến middleware tiếp theo
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
