// Importa los módulos necesarios.
import { DataTypes, Sequelize } from "sequelize"; // Asegúrate de importar Sequelize
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.

const Persona = db.define("tbb_personas", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
  },
  fechaNacimiento: {
    type: DataTypes.DATE,
  },
  genero: {
    type: DataTypes.STRING,
  },
  codigoPostal: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.TEXT,
  },
  numeroTelefono: {
    type: DataTypes.STRING,
  },
});

export default Persona;
