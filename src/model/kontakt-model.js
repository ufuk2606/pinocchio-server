import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Kontakt = sequelize.define(
  "Kontakt",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mitteilung: {
      type: DataTypes.STRING,
      defaultValue:"keine notes",
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "kontakt",
    timestamps: false,
  }
);

export default Kontakt;
