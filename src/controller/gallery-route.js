import express from "express";
import galleryRepository from "../repository/gallery-repository.js";
import * as s3Service from "../service/s3-service.js";

const router = express.Router();

router.get("/images/:id/content", async (req, res) => {
  try {
    const imageId = req.params.id;

    const galleryImage = await galleryRepository.getImageById(imageId);

    const fileKey = galleryImage.images.split("/").pop();
    const fileStream = s3Service.downloadFile(
      fileKey,
      process.env.AWS_BUCKET_NAME
    );

    res.setHeader("Content-Disposition", `inline; filename="${fileKey}"`);

    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.get("/images", async (req, res) => {
  try {
    const galleryImages = await galleryRepository.getImages();

    res.send(galleryImages);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

export default router;
