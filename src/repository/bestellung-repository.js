import Bestellungen from "../model/bestellungen-model.js";
import { Op } from "sequelize";

const getTotalVerkauf = async () => {
    try {
        const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    
        const totalPrice = await Bestellungen.sum("price", {
          where: {
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          },
        });
        return totalPrice;
      } catch (error) {
        console.log(error);
        throw error;
      }
};

const getAlteBestellung = async (pId) => {
  try {
    const menü = await Bestellungen.findAll({
      where: {
        userId:pId
      },
    });
    return menü;
  } catch (error) {
    throw new Error("error while getting menü");
  }
};

export default {
  getTotalVerkauf,
  getAlteBestellung
};
