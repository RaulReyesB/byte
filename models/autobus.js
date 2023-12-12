// Importa los módulos necesarios.
import { DataTypes } from "sequelize";
import Sequelize from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.

const Autobus = db.define("tbb_autobus", {
    capacidad: {
      type: DataTypes.INTEGER, // Tipo de datos para la capacidad (entero)
      allowNull: false, // La capacidad no puede ser nula
    },
    modelo: {
      type: DataTypes.STRING, // Tipo de datos para el modelo (cadena de texto)
      allowNull: false, // El modelo no puede ser nulo
    },
    tipo: {
      type: DataTypes.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
    estatus: {
      type: DataTypes.STRING, // Tipo de datos para el estatus (cadena de texto)
      defaultValue: "Activo", // Valor predeterminado para el estatus
    },
    fechaRegistro: {
      type: DataTypes.DATE, // Tipo de datos para la fecha de registro (fecha y hora)
      defaultValue: Sequelize.NOW, // Valor predeterminado para la fecha de registro (la fecha actual)
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


  export default Autobus;