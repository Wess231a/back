const Message = require("../models/Message");

// Envoyer un message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, room } = req.body;
    const message = new Message({ sender, receiver, content, room });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message", error });
  }
};

// Obtenir les messages d'une conversation
exports.getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages", error });
  }
};
