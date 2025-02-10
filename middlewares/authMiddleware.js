const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware de protection des routes (JWT obligatoire)
const protect = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }

    token = token.split(" ")[1]; // Extraire le token après "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur existe toujours en base de données
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    req.user = user; // Stocker les infos du user dans req pour les prochaines requêtes
    next();
  } catch (error) {
    console.error("Erreur JWT:", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

// Middleware de vérification des rôles (ex: protectRole(["freelancer", "admin"]))
const protectRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit, rôle insuffisant" });
    }
    next();
  };
};

module.exports = { protect, protectRole };
