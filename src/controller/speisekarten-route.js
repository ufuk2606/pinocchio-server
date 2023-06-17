import express from "express";
import monatsHitsRepository from "../repository/monatsHits-repository.js";
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import mittagsmenüRepository from "../repository/mittagsmenü-repository.js";
import speisekartenmenüRepository from "../repository/speisekartenmenü-repository.js";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpDirPath = path.join(__dirname, "../tmp");

const generatePDF = async () => {
  const tableData = await monatsHitsRepository.getMenü();
  const doc = new jsPDF();

  doc.setFontSize(36);
  doc.setFont("Playfair Display", "bold");
  doc.setTextColor(195, 157, 99);
  doc.text("Monats Hits", 20, 30);

  doc.setFontSize(20);

  let y = 40;
  tableData.forEach((essen, index) => {
    doc.setTextColor(195, 157, 99);
    doc.setFont("Playfair Display", "normal");
    doc.setFontSize(25);
    doc.text(`HIT ${index + 1}`, 20, y + 10);
    doc.setFontSize(20);
    doc.text(essen.name, 60, y + 5);

    y += 10;
    doc.setTextColor(195, 157, 99);
    doc.setFontSize(25);
    doc.text(essen.price.toString(), 190, y, { align: "right" });

    y += 10;
    doc.setTextColor(147, 144, 139);
    doc.setFontSize(12);
    doc.text(essen.content, 60, y - 5);

    // Çizgi ekleme
    const lineColor = [195, 157, 99];
    doc.setLineWidth(0.5);
    doc.setDrawColor(lineColor[0], lineColor[1], lineColor[2]);
    doc.line(20, y + 10, 200, y + 10);

    y += 20;
  });

  if (!fs.existsSync(tmpDirPath)) {
    fs.mkdirSync(tmpDirPath);
  }

  const filePath = path.join(tmpDirPath, "monats_hits.pdf");
  doc.save(filePath);

  return filePath;
};

router.get("/generate-pdf", async (req, res) => {
  try {
    const filePath = await generatePDF();
    res.download(filePath, "monats_hits.pdf");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/mittagsmenu", async (req, res) => {
  try {
    const mittagsmenu = await mittagsmenüRepository.getMittagsmenu();
    const binaryContent = mittagsmenu[0].dataValues.content;
    const pdfContent = Buffer.from(binaryContent, "binary");

    const fileName = "mittagsmenu.pdf";
    const filePath = join(__dirname, fileName);

    // PDF'i diske kaydetmek için
    writeFileSync(filePath, pdfContent);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }

      // Dosyayı indirdikten sonra sil
      unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/speisekartenmenu", async (req, res) => {
  try {
    const speisekartenmenü = await speisekartenmenüRepository.getSpeisekartenmenü();
    const binaryContent = speisekartenmenü[0].dataValues.content;
    const pdfContent = Buffer.from(binaryContent, "binary");

    const fileName = "speisekartenmenü.pdf";
    const filePath = join(__dirname, fileName);

    // PDF'i diske kaydetmek için
    writeFileSync(filePath, pdfContent);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }

      // Dosyayı indirdikten sonra sil
      unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

export default router;
