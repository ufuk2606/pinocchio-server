import express from "express";
import dasboardRepository from "../repository/dashboard-repository.js";
import monatsHitsRepository from "../repository/monatsHits-repository.js";
import userRepository from "../repository/user-repository.js";
import * as s3Service from '../service/s3-service.js';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import mittagsmenüRepository from "../repository/mittagsmenü-repository.js";
import speisekartenmenüRepository from "../repository/speisekartenmenü-repository.js";
import bestellungRepository from "../repository/bestellung-repository.js";

const router = express.Router();

const upload = multer();

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

router.post("/mittagsmenu", upload.single('mittagsmenu'), async (req, res, next) => {
  try {
    const mittagsmenuPDF = req.file;
    const mittagsmenu = await mittagsmenüRepository.addPDF(mittagsmenuPDF.buffer); 
    return res.status(201).send(mittagsmenu);
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

router.post("/speisekartenmenu", upload.single('speisekartenmenu'), async (req, res, next) => {
  try {
    const speisekartenmenüPDF = req.file;
    const speisekartenmenü = await speisekartenmenüRepository.addPDF(speisekartenmenüPDF.buffer); 
    return res.status(201).send(speisekartenmenü);
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
    const updateUserr = await userRepository.updateUser(user.id, updatedUser);
    return res.status(201).send(updateUserr);
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

router.put("/image", upload.single('profileImage'), async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const profileImage = req.file;
    const user = await userRepository.getUserByEmail(userEmail);
    const fileName = `pinocchio_${uuidv4()}`
    const profileImagePath = await s3Service.uploadFile(profileImage.buffer, fileName, process.env.AWS_BUCKET_NAME);
    const updatedImage = await userRepository.updateUserImage(user.id, profileImagePath.Location);
    return res.status(201).send(updatedImage);
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

router.get('/image', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const user = await userRepository.getUserByEmail(userEmail);

    if (!user || !user.profilImage) {
      return res.status(404).send({ message: 'User or profile image not found' });
    }

    const fileKey = user.profilImage.split('/').pop();
    const fileStream = s3Service.downloadFile(fileKey, process.env.AWS_BUCKET_NAME);

    res.setHeader('Content-Disposition', `inline; filename="${fileKey}"`);
    
    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await bestellungRepository.getTotalVerkauf();
    return res.status(200).json( total );
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/altebestellungen", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const user = await userRepository.getUserByEmail(userEmail);
    const alteBestellungen = await bestellungRepository.getAlteBestellung(user.id);
    return res.status(201).send(alteBestellungen);
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
