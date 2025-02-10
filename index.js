require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const connectDB = require("./config/db");

// ✅ Importation des routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const courseRoutes = require("./routes/courseRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ Initialisation de l'application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// 🔌 Connexion à MongoDB
connectDB();

// 🛡️ **Sécurité**
app.use(helmet()); // Protection des en-têtes HTTP
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Autorisation du frontend
app.use(cookieParser()); // Gestion des cookies

// 📌 **Protection contre le spam/DDoS**
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par IP
  message: "Trop de requêtes, veuillez réessayer plus tard."
});
app.use(limiter);

// 🔑 **Gestion des sessions (Obligatoire pour OAuth)**
app.use(session({
  secret: process.env.SESSION_SECRET || "monSecretSuperSecurise",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Active en production
    httpOnly: true, // Empêche l'accès via JavaScript
    sameSite: "lax" // Protection contre CSRF
  }
}));

// 🛠️ **Middlewares**
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// 🎭 **Protection CSRF**
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// ✅ Route pour récupérer le token CSRF
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// 🌐 **Routes API**
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

// 📂 **Servir les fichiers statiques (uploads)**
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🌐 **WebSockets : Gestion des connexions**
io.on("connection", (socket) => {
  console.log("🟢 Un utilisateur connecté :", socket.id);

  // Rejoindre une salle de notifications
  socket.on("joinNotifications", (userId) => {
    socket.join(userId);
    console.log(`Utilisateur ${userId} a rejoint la salle de notifications`);
  });

  // Écouter et envoyer des notifications
  socket.on("sendNotification", async (data) => {
    const Notification = require("./models/Notification");
    const notification = new Notification(data);
    await notification.save();
    io.to(data.user).emit("receiveNotification", notification);
    console.log(`Notification envoyée à ${data.user} :`, data.message);
  });

  // Déconnexion
  socket.on("disconnect", () => {
    console.log("🔴 Un utilisateur s'est déconnecté :", socket.id);
  });
});

// 🛠 **Gestion des Erreurs Globales**
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue.", error: err.message });
});

// 🚀 **Lancer le serveur**
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
