import Menü from "../model/menü-model.js";

const addEssen = async (pEssen) => {
  try {
    const addEssen = await Menü.create({
      name: pEssen.name,
      category: pEssen.category,
      price: pEssen.price,
    });
    return addEssen;
  } catch (error) {
    console.log(error);
  }
};

export default {
    addEssen
};
