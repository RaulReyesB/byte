// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.

// Define un modelo llamado "tbb_asiento".
const TbbAsiento = db.define("tbb_asiento", {
    // Define las propiedades de la tabla "tbb_asiento".
    autobus: {
        type: DataTypes.STRING(255), // Campo de tipo cadena de texto con longitud máxima de 255 caracteres.
        allowNull: false, // No permite valores nulos en este campo.
    },
    tipo: {
        type: DataTypes.STRING(255), // Campo de tipo cadena de texto con longitud máxima de 255 caracteres.
        allowNull: false, // No permite valores nulos en este campo.
    },
    estatus: {
        type: DataTypes.BOOLEAN, // Campo de tipo booleano.
        allowNull: false, // No permite valores nulos en este campo.
    },    
    identificador: {
        type: DataTypes.STRING, // Campo de tipo cadena de texto sin longitud máxima especificada.
        unique: true, // Hace que los valores en este campo sean únicos en la tabla.
    },
    zona: {
        type: DataTypes.STRING, // Campo de tipo cadena de texto sin longitud máxima especificada.
        unique: true, // Hace que los valores en este campo sean únicos en la tabla.
    },
}, {
    // Opciones adicionales del modelo, si las necesitas.
});

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
  

  const TbbReservacion = db.define("tbb_reservación", {
    Destino: {
      type: Sequelize.STRING, // Tipo de datos para el destino (cadena de texto)
      allowNull: false, // El destino no puede ser nulo
    },
    usuario: {
      type: Sequelize.STRING, // Tipo de datos para el usuario (cadena de texto)
      allowNull: false, // El usuario no puede ser nulo
    },
    asiento: {
      type: Sequelize.INTEGER, // Tipo de datos para el asiento (entero)
      allowNull: false, // El asiento no puede ser nulo
    },
    fecha: {
      type: Sequelize.DATE, // Tipo de datos para la fecha (fecha y hora)
      allowNull: false, // La fecha no puede ser nula
    },
    precioBase: {
      type: Sequelize.FLOAT, // Tipo de datos para el precio base (número de punto flotante)
      allowNull: false, // El precio base no puede ser nulo
    },
    estatus: {
      type: Sequelize.STRING, // Tipo de datos para el estatus (cadena de texto)
      defaultValue: "Activo", // Valor predeterminado para el estatus
    },
    tipo: {
      type: Sequelize.STRING, // Tipo de datos para el tipo (cadena de texto)
    },
  });

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

  const TbbItinerario = db.define("tbb_itinerario", {
    destino: {
      type: Sequelize.STRING, // Tipo de datos para el destino (cadena de texto)
      allowNull: false, // El destino no puede ser nulo
    },
    horas: {
      type: Sequelize.INTEGER, // Tipo de datos para las horas (entero)
      allowNull: false, // Las horas no pueden ser nulas
    },
    flexibilidad: {
      type: Sequelize.STRING, // Tipo de datos para la flexibilidad (cadena de texto)
    },
    recomendaciones: {
      type: Sequelize.TEXT, // Tipo de datos para las recomendaciones (texto largo)
    },
    duración: {
      type: Sequelize.INTEGER, // Tipo de datos para la duración (entero)
      allowNull: false, // La duración no puede ser nula
    },
  });


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
  
  
  
  
  
  







// Exporta el modelo "TbbAsiento" para que pueda ser utilizado en otros archivos.
export default TbbAsiento;
