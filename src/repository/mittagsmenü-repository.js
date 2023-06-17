import Mittagsmenü from "../model/mittagsmenü-model.js";

const addPDF = async (pPDF) => {
  try {
    const addPDF = await Mittagsmenü.create({
      content: pPDF.toString("binary"),
    });
    return addPDF;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const getMittagsmenu = async () => {
  try {
    const mittagsmenu = await Mittagsmenü.findAll({
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    return mittagsmenu;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

export default {
  addPDF,
  getMittagsmenu,
};
