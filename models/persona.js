// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.



const TbbPersona = db.define("tbb_persona", {
    nombre: {
      type: Sequelize.STRING, // Tipo de datos para el nombre (cadena de texto)
      allowNull: false, // El nombre no puede ser nulo
    },
    apellidoPaterno: {
      type: Sequelize.STRING, // Tipo de datos para el apellido paterno (cadena de texto)
      allowNull: false, // El apellido paterno no puede ser nulo
    },
    apellidoMaterno: {
      type: Sequelize.STRING, // Tipo de datos para el apellido materno (cadena de texto)
    },
    edad: {
      type: Sequelize.INTEGER, // Tipo de datos para la edad (entero)
    },
    fechaNacimiento: {
      type: Sequelize.DATE, // Tipo de datos para la fecha de nacimiento (fecha y hora)
    },
    genero: {
      type: Sequelize.STRING, // Tipo de datos para el género (cadena de texto)
    },
    codigoPostal: {
      type: Sequelize.STRING, // Tipo de datos para el código postal (cadena de texto)
    },
    direccion: {
      type: Sequelize.TEXT, // Tipo de datos para la dirección (texto largo)
    },
    numeroTelefono: {
      type: Sequelize.STRING, // Tipo de datos para el número de teléfono (cadena de texto)
    },
    correoElectronico: {
      type: Sequelize.STRING, // Tipo de datos para el correo electrónico (cadena de texto)
      allowNull: false, // El correo electrónico no puede ser nulo
      unique: true, // El correo electrónico debe ser único
    },
  });

  export default TbbPersona;