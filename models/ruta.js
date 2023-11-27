// Importa los módulos necesarios.

import { DataTypes,Sequelize } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.



const TbbRuta = db.define("tbb_ruta", {
    inicio: {
      type: DataTypes.STRING, // Tipo de datos para el inicio (cadena de texto)
      allowNull: false, // El inicio no puede ser nulo
    },
    tipo: {
      type: DataTypes.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
    paradas: {
      type: DataTypes.INTEGER, // Tipo de datos para las paradas (entero)
    },
    distancia: {
      type: DataTypes.FLOAT, // Tipo de datos para la distancia (número de punto flotante)
    },
    fin: {
      type: DataTypes.STRING, // Tipo de datos para el fin (cadena de texto)
      allowNull: false, // El fin no puede ser nulo
    },
    ubicacionID:{
      type: DataTypes.INTEGER, // Tipo de datos para la clave foránea (entero)
      allowNull: false,
      references: {
        model: 'tbb_ubicaciones', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la clave primaria referenciada
      },
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

  export default TbbRuta;