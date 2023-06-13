import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const MonatsHits = sequelize.define(
  "MonatsHits",
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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "monatsHits",
    timestamps: false,
  }
);

export default MonatsHits;
