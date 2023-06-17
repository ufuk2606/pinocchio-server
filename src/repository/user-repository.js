import User from "../model/user-model.js";

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const getUserByEmail = async (pEmail) => {
  try {
    const user = await User.findOne({
      where: {
        email: pEmail,
      },
    });
    return user;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const getUserById = async (pId) => {
  try {
    const user = await User.findOne({
      where: {
        id: pId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

const createUser = async (pUser) => {
  try {
    const existingUser = await User.findOne({ where: { email: pUser.email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const newUser = await User.create(pUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (pId, pUser) => {
  
  try {
    const updatedUser = await User.update(pUser,{
      where: {
        id: pId,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUserImage = async (pid, pUpdatedUserImage) => {
  try {
    const updatedUser = await User.update({profilImage:pUpdatedUserImage},{
      where: {
        id: pid,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (pUserId) => {
  return await User.destroy({
    where: {
      id: pUserId,
    },
  });
};

const updatedUsers = async (users) => {
  try {
    const result = await User.bulkCreate(users, {
      updateOnDuplicate: ["role"],
    });
    console.log(result); // Prints the updated rows
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUsers,
  createUser,
  deleteUserById,
  getUserByEmail,
  updatedUsers,
  updateUser,
  updateUserImage,
  getUserById
};
