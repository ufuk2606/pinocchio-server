
import Bestellungen from "../model/bestellungen-model.js";
import User from "../model/user-model.js";
import sequelize from './connection.js';


User.hasMany(Bestellungen, { foreignKey: 'userId', onDelete: 'CASCADE' });
Bestellungen.belongsTo(User, { foreignKey: 'userId' });
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectToDatabase();