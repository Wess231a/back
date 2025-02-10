const User = require("../models/User");
const Project = require("../models/Project");
const Course = require("../models/Course");
const Payment = require("../models/Payment");

exports.getDashboardStats = async (req, res) => {
  try {
    // Récupérer le mois et l'année depuis la requête (par défaut, mois actuel)
    const { month, year } = req.query;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();
    const selectedMonth = month ? parseInt(month) - 1 : new Date().getMonth(); // -1 car les mois commencent à 0

    // Définir les dates de début et fin du mois
    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 0);

    // Nouveaux utilisateurs ce mois-ci
    const newUsers = await User.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } });

    // Projets créés ce mois-ci
    const newProjects = await Project.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } });

    // Cours créés ce mois-ci
    const newCourses = await Course.countDocuments({ createdAt: { $gte: startDate, $lt: endDate } });

    // Revenus générés ce mois-ci
    const monthlyRevenue = await Payment.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      month: selectedMonth + 1,
      year: selectedYear,
      newUsers,
      newProjects,
      newCourses,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques", error });
  }
};
