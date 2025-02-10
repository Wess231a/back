require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Project = require("./models/Project");
const Course = require("./models/Course");
const bcrypt = require("bcryptjs");

connectDB();

const seedData = async () => {
  try {
    // Supprimer les anciennes données
    await User.deleteMany();
    await Project.deleteMany();
    await Course.deleteMany();

    // Ajouter un utilisateur test (freelancer avec CV et LinkedIn)
    const hashedPassword = await bcrypt.hash("password123", 10);
    const freelancer = await User.create({
      name: "Alice Dupont",
      email: "alice@example.com",
      password: hashedPassword,
      role: "freelancer",
      cv: "https://moncv.com/alice",
      linkedin: "https://linkedin.com/in/alicedupont",
    });

    // Ajouter un client test
    const client = await User.create({
      name: "Bob Client",
      email: "bob@example.com",
      password: hashedPassword,
      role: "client",
    });

    // Ajouter un projet test
    const project = await Project.create({
      title: "Développement d'un site web",
      description: "Créer un site e-commerce avec React et Node.js",
      client_id: client._id,
      budget: 1000,
    });

    // Ajouter un cours test
    const course = await Course.create({
      title: "Formation Node.js",
      description: "Apprenez à utiliser Node.js et Express",
      price: 50,
      instructor_id: freelancer._id,
    });

    console.log("✅ Données insérées avec succès !");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur d’insertion :", error);
    process.exit(1);
  }
};

// Exécuter l'importation
seedData();
