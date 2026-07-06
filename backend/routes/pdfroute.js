const express = require("express");

const router = express.Router();

const pdf = require("../controllers/pdfcontroller");

router.get("/attendance/pdf", pdf.exportAttendancePDF);

module.exports = router;