import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Rezervation = sequelize.define(
  "Rezervation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    anzahlPersonen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uhrZeit: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "rezervation",
    timestamps: false,
  }
);

export default Rezervation;
