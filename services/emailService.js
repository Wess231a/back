const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Code de réinitialisation de mot de passe",
    html: `<p>Bonjour,</p>
           <p>Votre code de réinitialisation est : <strong>${code}</strong></p>
           <p>Ce code est valide pendant 15 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};
