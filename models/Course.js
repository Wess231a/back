const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    files: [
      {
        fileName: { type: String },
        filePath: { type: String },
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
