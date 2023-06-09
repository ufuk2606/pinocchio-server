import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Bestellungen = sequelize.define(
  "Bestellungen",
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
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    abholen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mitZahle: {
      type: DataTypes.STRING,
      defaultValue:"Barzahlung",
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
    tableName: "bestellungen",
    timestamps: false,
  }
);

export default Bestellungen;
