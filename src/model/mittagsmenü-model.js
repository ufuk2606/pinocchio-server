import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Mittagsmenü = sequelize.define(
  "Mittagsmenü",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "mittagsmenü",
    timestamps: false,
  }
);

export default Mittagsmenü;
