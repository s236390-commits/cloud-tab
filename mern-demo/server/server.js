const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Student = require("./models/Student");
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API kiểm tra Backend
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend đang hoạt động"
    });
});
// API lấy danh sách sinh viên
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách sinh viên",
            error: error.message
        });
    }
});
// API thêm sinh viên
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi thêm sinh viên",
            error: error.message
        });
    }
});
// API cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi cập nhật sinh viên",
            error: error.message
        });
    }
});
// API xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa sinh viên thành công",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi xóa sinh viên",
            error: error.message
        });
    }
});

// Khởi động Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});