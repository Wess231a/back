const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect, protectRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route avec filtres (ex: ?month=2&year=2024)
router.get("/", protect, protectRole(["admin"]), getDashboardStats);

module.exports = router;
