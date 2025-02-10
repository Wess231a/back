const express = require("express");
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectController");
const { protect, protectRole } = require("../middlewares/authMiddleware"); // ✅ Assure-toi que cette ligne est correcte

const router = express.Router();

// Routes protégées
router.post("/", protect, protectRole(["client"]), createProject);  
router.get("/", protect, getProjects);  
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, protectRole(["client"]), updateProject);
router.delete("/:id", protect, protectRole(["client"]), deleteProject);

module.exports = router;
