// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.
import Sequelize from "sequelize";
import Autobus from "../models/autobus.js";
// Define un modelo llamado "tbb_asiento".
const Asiento = db.define("tbb_asiento", {
  autobusID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tbb_autobuses', // Nombre de la tabla de Autobus
      key: 'id', // Clave primaria de la tabla de Autobus
    },
  },
  numero: { // Agrega la definición de la columna 'numero'
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  estatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  identificador: {
    type: DataTypes.STRING,
  },
  zona: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});


export default Asiento;