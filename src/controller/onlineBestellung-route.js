import express from "express";
import onlineBestellungRepository from "../repository/onlineBestellungRepository.js";
import userRepository from "../repository/user-repository.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await onlineBestellungRepository.getMenüs();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching users" });
  }
});

router.post("/bestellungen", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const bestellungen = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await bestellungen.map((item) => {
      onlineBestellungRepository.createBestellungen(user.id, item);
    });
    await bestellungEmail(user, bestellungen);
    return res.status(201).send(bestellungen);
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

router.get("/category", async (req, res) => {
  try {
    const currentlyCategory = req.query.category;
    const menü = await onlineBestellungRepository.getMenüByCategory(
      currentlyCategory
    );
    return res.status(200).send(menü);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching menü" });
  }
});

async function bestellungEmail(pUser, pBestellung) {
  let totalPrice = 0;
  const siparisTemplate = pBestellung
    .map((siparis) => {
      const price = siparis.product.count * siparis.product.price;
      totalPrice += price;
      return `<li> Name : ${siparis.product.name}</li>
      <li> Count : ${siparis.product.count}</li>
      <li> Price : ${siparis.product.count * siparis.product.price}</li>
      <li> --------------------------------</li>`;
    })
    .join("");

  const abholen = pBestellung[0].abholen ? "sen götür" : "o alacak";
  const mitZahle = pBestellung[0].mitZahle;
  const mitteilung = pBestellung[0].mitteilung;

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
    subject: "Bestellung Email",
    html: `<h1>Herzliche Wilkommen</h1>
    <h2> Ristorante-Pizzeria Pinocchio </h2>
    <h3> Name :  ${pUser.firstName} ${pUser.lastName} </h3>
    <div>
      <ul>${siparisTemplate} </ul>
    </div>
    <div>
      <p>Abholen: ${abholen}</p>
      <p>mitZahle: ${mitZahle}</p>
      <p>Mitteilung: ${mitteilung}</p>
    </div>
    <div>
      <p>Total Price: ${totalPrice}</p>
    </div> `,
    attachements: [],
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

export default router;
