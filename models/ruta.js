// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.



const TbbRuta = db.define("tbb_ruta", {
    inicio: {
      type: Sequelize.STRING, // Tipo de datos para el inicio (cadena de texto)
      allowNull: false, // El inicio no puede ser nulo
    },
    tipo: {
      type: Sequelize.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
    paradas: {
      type: Sequelize.INTEGER, // Tipo de datos para las paradas (entero)
    },
    distancia: {
      type: Sequelize.FLOAT, // Tipo de datos para la distancia (número de punto flotante)
    },
    fin: {
      type: Sequelize.STRING, // Tipo de datos para el fin (cadena de texto)
      allowNull: false, // El fin no puede ser nulo
    },
  });

  export default TbbRuta;