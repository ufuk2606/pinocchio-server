import express from "express";
import userRepository from "../repository/user-repository.js";
import kontaktRepository from "../repository/kontakt-repository.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/kontakt", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const kontaktMail = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await kontaktRepository.createKontaktMail(user.id, kontaktMail);
    await kontaktEmail(user, kontaktMail);
    return res.status(201).send(kontaktMail);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid user input" });
    } else if (error.message === "User with this email already exists") {
      return next({ message: "A user with this email already exists" });
    } else {
      return next(error);
    }
  }
});

async function kontaktEmail(pUser, pKontaktMail) {
  const gmailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ufukozkar26@gmail.com",
      pass: "yzztkvopyuvdwwbk",
    },
    tls: { rejectUnauthorized: false },
    ignoreTLS: true,
  });

  const info = await gmailTransporter.sendMail({
    from: "ufukozkar26@gmail.com",
    to: pUser.email,
    subject: "Kontakt Email",
    html: `<h1>Herzliche Wilkommen</h1><h2> Ristorante-Pizzeria Pinocchio </h2><h3> Name :  ${pUser.firstName} ${pUser.lastName} </h3><h4> Mitteilung : ${pKontaktMail.mitteilung}</h4>`,
    attachements: [],
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

export default router;
