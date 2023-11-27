import { DataTypes, Sequelize } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO"
import db from '../config/db.js';
import bcrypt from "bcrypt";


const User = db.define("tbb_users",
  {
    name: {
      type: DataTypes.STRING(255),
      // indica que es obligatorio 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },// token: al no definir el que es obligatorio, lo toma como opcional 
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    personaID:{
      type: DataTypes.INTEGER, // Tipo de datos para la clave foránea (entero)
      allowNull: false,
      references: {
        model: 'tbb_personas', // Nombre de la tabla referenciada
        key: 'id', // Nombre de la clave primaria referenciada
      },
    }, createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true, // O ajusta a false si deseas permitir valores nulos
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

  },
  
  {
    hooks: {
      beforeCreate: async (User) => {
        const salt = await bcrypt.genSalt(10);
        User.password = await bcrypt.hash(User.password, salt);

      }

    }
  }
);
// compara contraseñas por medio del hasing 


export default User
