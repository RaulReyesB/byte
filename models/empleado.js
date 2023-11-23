// Importa los módulos necesarios.
import { DataTypes } from "sequelize";
import db from '../config/db.js';

const TbbEmpleado = db.define("tbb_empleado", {
  personaId: {
    type: DataTypes.INTEGER, // Tipo de datos para la clave foránea (entero)
    allowNull: false,
    references: {
      model: 'tbb_personas', // Nombre de la tabla referenciada
      key: 'id', // Nombre de la clave primaria referenciada
    },
  },
  usuario: {
    type: DataTypes.STRING, // Tipo de datos para el usuario (cadena de texto)
    allowNull: false, // El usuario no puede ser nulo
  },
  contraseña: {
    type: DataTypes.STRING, // Tipo de datos para la contraseña (cadena de texto)
    allowNull: false, // La contraseña no puede ser nula
  },
  fechaRegistro: {
    type: DataTypes.DATE, // Tipo de datos para la fecha de registro (fecha y hora)
    defaultValue: DataTypes.NOW, // Valor predeterminado para la fecha de registro (la fecha actual)
  },
  Tipo: {
    type: DataTypes.STRING, // Tipo de datos para el tipo (cadena de texto)
  },
});

export default TbbEmpleado;
