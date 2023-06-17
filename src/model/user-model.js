import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    profilImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://hicoders-fp.fra1.digitaloceanspaces.com/pinocchio_c882028d-8e22-464b-acd7-2d9aa43340bf",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
