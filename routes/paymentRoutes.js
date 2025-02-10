const express = require("express");
const { processPayment } = require("../services/paymentService");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour effectuer un paiement (protégé)
router.post("/pay", protect, processPayment);

module.exports = router;
