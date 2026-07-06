const express = require("express");
const router = express.Router();

const c = require("../controllers/attendancecontroller");

router.post("/attendance", c.markAttendance);
router.get("/attendance", c.getAttendance);
// Export Attendance CSV
router.get("/attendance/export/csv", c.exportAttendanceCSV);


module.exports = router;