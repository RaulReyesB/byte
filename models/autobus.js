// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.


const TbbAutobus = db.define("tbb_asiento", {
    capacidad: {
      type: Sequelize.INTEGER, // Tipo de datos para la capacidad (entero)
      allowNull: false, // La capacidad no puede ser nula
    },
    modelo: {
      type: Sequelize.STRING, // Tipo de datos para el modelo (cadena de texto)
      allowNull: false, // El modelo no puede ser nulo
    },
    tipo: {
      type: Sequelize.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
    estatus: {
      type: Sequelize.STRING, // Tipo de datos para el estatus (cadena de texto)
      defaultValue: "Activo", // Valor predeterminado para el estatus
    },
    fechaRegistro: {
      type: Sequelize.DATE, // Tipo de datos para la fecha de registro (fecha y hora)
      defaultValue: Sequelize.NOW, // Valor predeterminado para la fecha de registro (la fecha actual)
    }
  });

  export default TbbAutobus;