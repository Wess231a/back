const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Traitement du paiement
exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, token } = req.body;

    // Création du paiement Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100, // Convertir en centimes
      currency,
      source: token,
      description: "Paiement pour un service",
    });

    res.json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ message: "Erreur de paiement", error });
  }
};
