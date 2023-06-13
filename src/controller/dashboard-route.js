import express from "express";
import dasboardRepository from "../repository/dashboard-repository.js";
import monatsHitsRepository from "../repository/monatsHits-repository.js";

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


export default router;
