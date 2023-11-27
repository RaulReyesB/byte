// Importa los módulos necesarios.
import { DataTypes, Sequelize } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.


const TbbItinerario = db.define("tbb_itinerario", {
    destino: {
      type: DataTypes.STRING, // Tipo de datos para el destino (cadena de texto)
      allowNull: false, // El destino no puede ser nulo
    },
    horas: {
      type: DataTypes.INTEGER, // Tipo de datos para las horas (entero)
      allowNull: false, // Las horas no pueden ser nulas
    },
    flexibilidad: {
      type: DataTypes.STRING, // Tipo de datos para la flexibilidad (cadena de texto)
    },
    recomendaciones: {
      type: DataTypes.TEXT, // Tipo de datos para las recomendaciones (texto largo)
    },
    duración: {
      type: DataTypes.INTEGER, // Tipo de datos para la duración (entero)
      allowNull: false, // La duración no puede ser nula
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
  export default TbbItinerario;