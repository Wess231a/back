const express = require("express");
const { getNotifications, markAsRead } = require("../controllers/notificationController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Obtenir les notifications (protégé)
router.get("/", protect, getNotifications);

// Marquer une notification comme lue (protégé)
router.put("/:id", protect, markAsRead);

module.exports = router;
