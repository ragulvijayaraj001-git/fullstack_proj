const express = require("express");
const router = express.Router();

const c = require("../controllers/studentcontroller");

router.post("/students", c.addStudent);
router.get("/students", c.getStudents);
router.get("/students/:id", c.getStudentById);
router.put("/students/:id", c.updateStudent);
router.delete("/students/:id", c.deleteStudent);

module.exports = router;