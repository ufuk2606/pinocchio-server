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
    const existingUser = await User.findOne({ where: { id: pId } });
    if (!existingUser) {
      throw new Error("There is no user with this id");
    }
    const newUser = await User.update(
      {
        firstName: pUser.firstName,
        lastName: pUser.lastName,
        email: pUser.email,
        telefon: pUser.telefon,
        street: pUser.street,
        place: pUser.place,
      },
      {
        where: {
          id: pId,
        },
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
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
};
