import MonatsHits from "../model/monatsHits-model.js";

const addEssen = async (pEssen) => {
  try {
    const addEssen = await MonatsHits.create({
      name: pEssen.name,
      content: pEssen.content,
      price: pEssen.price,
    });
    return addEssen;
  } catch (error) {
    console.log(error);
  }
};

const getMenü = async () => {
  try {
    const menüs = await MonatsHits.findAll();
    return menüs;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

export default {
    addEssen,
    getMenü
};
