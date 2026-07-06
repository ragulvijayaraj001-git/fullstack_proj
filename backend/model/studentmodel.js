const db = require("../config/db");

// Add Student
const addStudent = (data, cb) => {
  const sql = `
    INSERT INTO students (name, rollNo, department, year, email, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    data.name,
    data.rollNo,
    data.department,
    data.year,
    data.email,
    data.phone,
  ], cb);
};

// Get All
const getStudents = (cb) => {
  db.query("SELECT * FROM students", cb);
};

// Get by ID
const getStudentById = (id, cb) => {
  db.query("SELECT * FROM students WHERE id=?", [id], cb);
};

// Update
const updateStudent = (id, data, cb) => {
  const sql = `
    UPDATE students
    SET name=?, rollNo=?, department=?, year=?, email=?, phone=?
    WHERE id=?
  `;

  db.query(sql, [
    data.name,
    data.rollNo,
    data.department,
    data.year,
    data.email,
    data.phone,
    id,
  ], cb);
};

// Delete
const deleteStudent = (id, cb) => {
  db.query("DELETE FROM students WHERE id=?", [id], cb);
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};