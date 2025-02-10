const express = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/authController"); // ✅ Vérifie que forgotPassword et resetPassword sont bien importés
const { check } = require("passport");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); // ✅ Envoi du code par email
router.post("/reset-password", resetPassword);
// 🔹 Démarrer l’authentification avec GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// 🔹 Callback après authentification GitHub
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.json({ message: "Connexion réussie avec GitHub", user: req.user });
  }
);

 // ✅ Validation du code et changement du mot de passe





module.exports = router;
