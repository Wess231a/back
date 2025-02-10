const express = require("express");
const { getAllUsers, updateUserRole } = require("../controllers/userController"); // ✅ Vérifie bien ces imports
const { protect } = require("../middlewares/authMiddleware");
const { protectRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

// 🔒 Seuls les admins peuvent voir tous les utilisateurs
router.get("/", protect, protectRole(["admin"]), getAllUsers);

// 🔒 Seuls les admins peuvent modifier un rôle
router.put("/update-role", protect, protectRole(["admin"]), updateUserRole);


module.exports = router;
