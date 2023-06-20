import Gallery from "../model/gallery-model.js";

const getImages = async () => {
  try {
    const images = await Gallery.findAll();
    return images;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const getImageById = async (pId) => {
  try {
    const image = await Gallery.findByPk(pId);
    return image;
  } catch (error) {
    throw new Error("error while getting users");
  }
};


const createImage = async (pImage) => {
  try {
   
    const newGallery = await Gallery.build({ images: pImage });
    const createdGallery = await newGallery.save();
    return createdGallery;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




export default {
  createImage,
  getImages,
  getImageById
};
