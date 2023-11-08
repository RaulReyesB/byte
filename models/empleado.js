// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.


const TbbEmpleado = db.define("tbb_empleado", {
    persona: {
      type: Sequelize.STRING, // Tipo de datos para la persona (cadena de texto)
      allowNull: false, // La persona no puede ser nula
    },
    usuario: {
      type: Sequelize.STRING, // Tipo de datos para el usuario (cadena de texto)
      allowNull: false, // El usuario no puede ser nulo
    },
    contraseña: {
      type: Sequelize.STRING, // Tipo de datos para la contraseña (cadena de texto)
      allowNull: false, // La contraseña no puede ser nula
    },
    fechaRegistro: {
      type: Sequelize.DATE, // Tipo de datos para la fecha de registro (fecha y hora)
      defaultValue: Sequelize.NOW, // Valor predeterminado para la fecha de registro (la fecha actual)
    },
    Tipo: {
      type: Sequelize.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
  });

  export default TbbEmpleado;