// Importa los módulos necesarios.
import { DataTypes, Sequelize } from "sequelize"; // Asegúrate de importar Sequelize
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.

const TbbPersona = db.define("tbb_personas", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
  },
<<<<<<< HEAD
  fechaNacimiento: {
=======
  fecha_nacimiento: {
>>>>>>> 18b8a5d23eed2aa649280a30f9449c52fa7ded89
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true, // O ajusta a false si deseas permitir valores nulos
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

export default TbbPersona;
