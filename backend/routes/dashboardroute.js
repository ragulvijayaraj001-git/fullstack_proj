const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardcontroller");

router.get("/dashboard", dashboardController.getDashboardStats);

module.exports = router;