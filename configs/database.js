const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Nạp biến môi trường từ file .env
dotenv.config();

// Lấy URI của cơ sở dữ liệu từ biến môi trường
const dbURI = process.env.DB_URI;

// Hàm kết nối đến MongoDB
async function connectDB() {
  try {
    await mongoose.connect(dbURI); // Bỏ các tùy chọn useNewUrlParser và useUnifiedTopology
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Thoát quá trình nếu kết nối thất bại
  }
}

module.exports = connectDB;
