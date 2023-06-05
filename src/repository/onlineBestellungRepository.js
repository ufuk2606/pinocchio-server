import Menü from "../model/menü-model.js";
import Bestellungen from "../model/bestellungen-model.js";

const getMenüs = async () => {
  try {
    const menüs = await Menü.findAll();
    return menüs;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

//
const createBestellungen = async (pId,pProduct) => {
  try {
    const bestellung = await Bestellungen.create({
      name: pProduct.name,
      category: pProduct.category,
      count: pProduct.count,
      price: pProduct.price,
      userId: pId
    });
    return bestellung;
  } catch (error) {
    console.log(error);
  }
};

const getMenüByCategory = async (pCategory) => {
  try {
    const menü = await Menü.findAll({
      where: {
        category:pCategory
      },
    });
    return menü;
  } catch (error) {
    throw new Error("error while getting menü");
  }
};

export default {
  getMenüByCategory,
  getMenüs,
  createBestellungen,
};
