import express from "express";
import onlineBestellungRepository from "../repository/onlineBestellungRepository.js";
import userRepository from "../repository/user-repository.js";

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
    const userEmail  = req.query.email;
    const bestellungen  = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await bestellungen.map((item) =>{
      onlineBestellungRepository.createBestellungen(user.id,item )
    } )
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
    const menü = await onlineBestellungRepository.getMenüByCategory(currentlyCategory);
    return res.status(200).send(menü);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching menü" });
  }
});

export default router;
