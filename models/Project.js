const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    budget: { type: Number, required: true },
    status: { type: String, enum: ["en cours", "terminé", "annulé"], default: "en cours" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
