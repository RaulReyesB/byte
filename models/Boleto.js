import { DataTypes,Sequelize } from "sequelize";
import db from '../config/db.js';


const Boleto = db.define('tbb_boleto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asientoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Boleto;