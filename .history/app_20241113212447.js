const express = require("express");
const morgan = require("morgan");
const connectDB = require("./configs/database");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Kết nối tới MongoDB
connectDB();

// Cấu hình cổng và chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
