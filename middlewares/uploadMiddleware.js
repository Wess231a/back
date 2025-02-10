const multer = require("multer");
const path = require("path");

// Définir le stockage des fichiers de cours
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/courses/"); // Stocke les fichiers des cours dans un dossier dédié
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtrer les types de fichiers acceptés (PDF, vidéos, images, etc.)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/mpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé"), false);
  }
};

// Initialisation de `multer`
const uploadCourse = multer({ storage, fileFilter });

module.exports = { uploadCourse };
