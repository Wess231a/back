const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function () { return !this.googleId && !this.githubId; } }, // Mot de passe requis sauf pour OAuth
    role: { 
      type: String, 
      enum: ["admin", "freelancer", "client", "formateur"], 
      default: "client"
    },
    cv: { 
      type: String, 
      validate: {
        validator: function(value) {
          return this.role !== "freelancer" || (value && value.length > 0);
        },
        message: "Le CV est obligatoire pour les freelancers."
      }
    },
    linkedin: { 
      type: String, 
      validate: {
        validator: function(value) {
          return this.role !== "freelancer" || (value && value.length > 0);
        },
        message: "Le profil LinkedIn est obligatoire pour les freelancers."
      }
    },
    avatar: { type: String, default: "" }, // URL de la photo de profil
    googleId: { type: String }, // Stocker l'ID Google OAuth
    githubId: { type: String }, // Stocker l'ID GitHub OAuth
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
