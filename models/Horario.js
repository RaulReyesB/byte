import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Horario = db.define('tbc_horario', {
  horario_salida: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horario_llegada: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  viajeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Horario;
