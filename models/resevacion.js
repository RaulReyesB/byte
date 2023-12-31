// Importa los módulos necesarios.
import { DataTypes,Sequelize } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de DataTypes ya configurada.


const TbbReservacion = db.define("tbb_reservaciones", {
    Destino: {
      type: DataTypes.STRING, // Tipo de datos para el destino (cadena de texto)
      allowNull: false, // El destino no puede ser nulo
    },
    usuario: {
      type: DataTypes.STRING, // Tipo de datos para el usuario (cadena de texto)
      allowNull: false, // El usuario no puede ser nulo
    },
    asiento: {
      type: DataTypes.INTEGER, // Tipo de datos para el asiento (entero)
      allowNull: false, // El asiento no puede ser nulo
    },
    fecha: {
      type: DataTypes.DATE, // Tipo de datos para la fecha (fecha y hora)
      allowNull: false, // La fecha no puede ser nula
    },
    precioBase: {
      type: DataTypes.FLOAT, // Tipo de datos para el precio base (número de punto flotante)
      allowNull: false, // El precio base no puede ser nulo
    },
    estatus: {
      type: DataTypes.STRING, // Tipo de datos para el estatus (cadena de texto)
      defaultValue: "Activo", // Valor predeterminado para el estatus
    },
    tipo: {
      type: DataTypes.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
  });
  export default TbbReservacion;