import express from "express";
import userRepository from "../repository/user-repository.js";
import rezervationRepository from "../repository/rezervation-repository.js";

const router = express.Router();



router.post("/rezervation", async (req, res, next) => {
  try {
    const userEmail  = req.query.email;
    const rezervation  = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await rezervationRepository.createRezervation(user.id, rezervation )
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


export default router;
