import Speisekartenmenü from "../model/speisekartenmenü-model.js";

const addPDF = async (pPDF) => {
  try {
    const addPDF = await Speisekartenmenü.create({
      content: pPDF.toString("binary"),
    });
    return addPDF;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSpeisekartenmenü = async () => {
  try {
    const speisekartenmenü = await Speisekartenmenü.findAll({
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    return speisekartenmenü;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

export default {
  addPDF,
  getSpeisekartenmenü,
};
