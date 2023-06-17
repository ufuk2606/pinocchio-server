import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Speisekartenmenü = sequelize.define(
  "Speisekartenmenü",
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
    tableName: "speisekartenmenü",
    timestamps: false,
  }
);

export default Speisekartenmenü;

// ALTER TABLE `speisekartenmenü` MODIFY COLUMN `content` LONGTEXT;