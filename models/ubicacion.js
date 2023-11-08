// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.


const TbbUbicacion = db.define("tbb_ubicacion", {
    nombre: {
      type: Sequelize.STRING, // Tipo de datos para el nombre (cadena de texto)
      allowNull: false, // El nombre no puede ser nulo
    },
    tipo: {
      type: Sequelize.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
    estatus: {
      type: Sequelize.STRING, // Tipo de datos para el estatus (cadena de texto)
      defaultValue: "Activo", // Valor predeterminado para el estatus
    },
    region: {
      type: Sequelize.STRING, // Tipo de datos para la región (cadena de texto)
    },
    latitud: {
        type: Sequelize.FLOAT, // Tipo de datos para la latitud
      },
      longitud: {
        type: Sequelize.FLOAT, // Tipo de datos para la longitud
      }
      
  });

  export default TbbUbicacion;