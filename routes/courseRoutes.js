const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");
const { protect, protectRole } = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔒 Seuls les formateurs et les admins peuvent créer un cours
router.post("/", protect, protectRole(["formateur", "admin"]), createCourse);

// ✅ Tous les utilisateurs connectés peuvent voir la liste des cours
router.get("/", protect, getCourses);

// ✅ Tous les utilisateurs connectés peuvent voir un cours spécifique
router.get("/:id", protect, getCourseById);

// 🔒 Seuls les formateurs et les admins peuvent modifier un cours
router.put("/:id", protect, protectRole(["formateur", "admin"]), updateCourse);

// 🔒 Seuls les formateurs et les admins peuvent supprimer un cours
router.delete("/:id", protect, protectRole(["formateur", "admin"]), deleteCourse);

module.exports = router;
