import Kontakt from "../model/kontakt-model.js";

const createKontaktMail = async (pId,pKontaktMail) => {
  try {
    const kontaktMitteilung = await Kontakt.create({
      mitteilung: pKontaktMail.mitteilung,
      userId: pId
    });
    return kontaktMitteilung;
  } catch (error) {
    console.log(error);
  }
};

export default {
    createKontaktMail
};
