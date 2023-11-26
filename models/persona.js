// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.



const TbbPersona = db.define("tbb_personas", {
    nombre: {
      type: DataTypes.STRING, // Tipo de datos para el nombre (cadena de texto)
      allowNull: false, // El nombre no puede ser nulo
    },
    apellidoPaterno: {
      type: DataTypes.STRING, // Tipo de datos para el apellido paterno (cadena de texto)
      allowNull: false, // El apellido paterno no puede ser nulo
    },
    apellidoMaterno: {
      type: DataTypes.STRING, // Tipo de datos para el apellido materno (cadena de texto)
    },
    edad: {
      type: DataTypes.INTEGER, // Tipo de datos para la edad (entero)
    },
    genero: {
      type: DataTypes.STRING, // Tipo de datos para el género (cadena de texto)
    },
    codigoPostal: {
      type: DataTypes.STRING, // Tipo de datos para el código postal (cadena de texto)
    },
    direccion: {
      type: DataTypes.TEXT, // Tipo de datos para la dirección (texto largo)
    },
    numeroTelefono: {
      type: DataTypes.STRING, // Tipo de datos para el número de teléfono (cadena de texto)
    },
    correoElectronico: {
      type: DataTypes.STRING, // Tipo de datos para el correo electrónico (cadena de texto)
      allowNull: false, // El correo electrónico no puede ser nulo
      unique: true, // El correo electrónico debe ser único
    },
  });

  export default TbbPersona;