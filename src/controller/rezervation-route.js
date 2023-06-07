import express from "express";
import userRepository from "../repository/user-repository.js";
import rezervationRepository from "../repository/rezervation-repository.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/rezervation", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const rezervation = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await rezervationRepository.createRezervation(user.id, rezervation);
    await reservationEmail(user, rezervation);
    return res.status(201).send(rezervation);
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

async function reservationEmail(pUser, pReservation) {
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
    subject: "Reservation",
    html: `<h1>Herzliche Wilkommen</h1><h2> Ristorante-Pizzeria Pinocchio </h2><h3> Name :  ${pUser.firstName} ${pUser.lastName} </h3><h4> Anzahl Personen : ${pReservation.anzahlPersonen}</h4><h4> Datum :  ${pReservation.datum}</h4><h4> Zeit : ${pReservation.uhrZeit}</h4><h4> Mitteilung : ${pReservation.mitteilung}</h4>`,
    attachements: [],
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

export default router;
