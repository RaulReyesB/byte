// Importa los módulos necesarios.
import { DataTypes } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO".
import db from '../config/db.js'; // Importa la instancia de Sequelize ya configurada.
import Sequelize from "sequelize";
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
    },
    zona: {
        type: DataTypes.STRING, // Campo de tipo cadena de texto sin longitud máxima especificada.
    },
    autobusID: {
        type: DataTypes.INTEGER, // Tipo de datos para la clave foránea (entero)
        allowNull: false,
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

// Exporta el modelo "TbbAsiento" para que pueda ser utilizado en otros archivos.
export default TbbAsiento;