import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const viaje = db.define("tbc_viaje", {
  // Ejemplo de un campo llamado 'nombre' de tipo STRING
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // Puedes ajustar según tus necesidades
  },

  // Ejemplo de un campo llamado 'descripcion' de tipo TEXT
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true, // Puedes ajustar según tus necesidades
  },
  // Ejemplo de un campo llamado 'precio' de tipo DECIMAL
  precio: {
    type: DataTypes.DECIMAL(10, 2), // Puedes ajustar según tus necesidades
    allowNull: false, // Puedes ajustar según tus necesidades
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
  }

});

export default viaje;
