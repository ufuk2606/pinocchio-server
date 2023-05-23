import Menü from "../model/menü-model.js";


const getUsers = async () => {
  try {
    const users = await Menü.findAll()
    return users
  } catch (error) {
    throw new Error('error while getting users');
  }
}


const getMenüByCategory = async (pCategory) => {
  try {
    const menü = await Menü.findAll({
        attributes: pCategory
    });
    return menü;
  } catch (error) {
    throw new Error("error while getting menü");
  }
};

export default {
  getMenüByCategory, getUsers
};
