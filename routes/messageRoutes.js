const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Envoyer un message (protégé)
router.post("/", protect, sendMessage);

// Obtenir les messages d'une salle (protégé)
router.get("/:room", protect, getMessages);

module.exports = router;
