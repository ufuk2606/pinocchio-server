import express from "express";
import onlineBestellungRepository from "../repository/onlineBestellungRepository.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await onlineBestellungRepository.getUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching users" });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const currentlyCategory = req.params.category;
    const menü = await onlineBestellungRepository.getMenüByCategory(currentlyCategory);
    return res.status(200).send(menü);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching menü" });
  }
});

export default router;
