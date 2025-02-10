const Course = require("../models/Course");

// ✅ Upload d’un fichier de cours
exports.uploadCourseFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Aucun fichier envoyé" });

    // Créer un enregistrement du fichier dans la base de données
    const courseFile = {
      fileName: req.file.filename,
      filePath: `/uploads/courses/${req.file.filename}`,
      uploadedBy: req.user._id
    };

    res.json({ message: "Fichier de cours uploadé avec succès", file: courseFile });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
