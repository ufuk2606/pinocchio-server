import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Menü = sequelize.define(
  "Menü",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "menüs",
    timestamps: false,
  }
);

export default Menü;
