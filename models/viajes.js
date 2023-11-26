import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TbbViajes = db.define("tbb_viajes", {
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
  fecha_Inicio:{
    type:DataTypes.DATE,
    allowNull: false,
  },
  fecha_Inicio:{
    type:DataTypes.DATE,
    allowNull: false,
  },
  
  rutaID:{
    type: DataTypes.INTEGER, // Tipo de datos para la clave foránea (entero)
    allowNull: false,
    references: {
      model: 'tbb_ruta', // Nombre de la tabla referenciada
      key: 'id', // Nombre de la clave primaria referenciada
    },

  }

});

export default TbbViajes;
