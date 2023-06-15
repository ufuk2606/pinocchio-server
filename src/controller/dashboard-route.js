import express from "express";
import dasboardRepository from "../repository/dashboard-repository.js";
import monatsHitsRepository from "../repository/monatsHits-repository.js";
import userRepository from "../repository/user-repository.js";

const router = express.Router();

router.post("/essen", async (req, res, next) => {
  try {
    const essen = req.body;
    await dasboardRepository.addEssen( essen );
    return res.status(201).send(essen);
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

router.post("/monatsHits", async (req, res, next) => {
  try {
    const essen = req.body;
    await monatsHitsRepository.addEssen( essen );
    return res.status(201).send(essen);
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

router.put("/dashboard", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const updatedUser = req.body;
    const user = await userRepository.getUserByEmail(userEmail);
    await userRepository.updateUser(user.id, updatedUser);
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
