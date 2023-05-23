import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const Menü = sequelize.define('Menü', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'menüs',
  timestamps: false
});


export default Menü;