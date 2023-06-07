import Rezervation from "../model/rezervation-model.js";

const createRezervation = async (pId,pRezervation) => {
  try {
    const rezervation = await Rezervation.create({
      anzahlPersonen: pRezervation.anzahlPersonen,
      datum: pRezervation.datum,
      uhrZeit: pRezervation.uhrZeit,
      mitteilung: pRezervation.mitteilung,
      userId: pId
    });
    return rezervation;
  } catch (error) {
    console.log(error);
  }
};

export default {
  createRezervation
};
