const Student = require("../model/studentmodel");

// Add Student
exports.addStudent = (req, res) => {

  const {
    name,
    rollNo,
    department,
    year,
    email,
    phone,
  } = req.body;

  if (
    !name ||
    !rollNo ||
    !department ||
    !year ||
    !email ||
    !phone
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email.",
    });
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must contain exactly 10 digits.",
    });
  }

  Student.addStudent(req.body, (err) => {

    if (err) {

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Email or Roll Number already exists.",
        });
      }

      return res.status(500).json({
        success: false,
        message: err.message,
      });

    }

    res.json({
      success: true,
      message: "Student Added Successfully",
    });

  });

};

// Get All Students
exports.getStudents = (req, res) => {

  Student.getStudents((err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      students: result,
    });

  });

};

// Get Student by ID
exports.getStudentById = (req, res) => {

  Student.getStudentById(req.params.id, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      student: result[0],
    });

  });

};

// Update Student
exports.updateStudent = (req, res) => {

  Student.updateStudent(
    req.params.id,
    req.body,
    (err) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Student Updated Successfully",
      });

    }
  );

};

// Delete Student
exports.deleteStudent = (req, res) => {

  Student.deleteStudent(req.params.id, (err) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Student Deleted Successfully",
    });

  });

};