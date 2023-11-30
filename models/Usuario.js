import { DataTypes, Sequelize } from "sequelize"; // Elemento del ORM que permite definir los tipos de datos de las columnas del "OBJETO"
import db from '../config/db.js';
import bcrypt from "bcrypt";


const Usuario = db.define("tbb_usuarios",
  {
    correoElectronico: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },// token: al no definir el que es obligatorio, lo toma como opcional 
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  
  {
    hooks: {
      beforeCreate: async (User) => {
        const salt = await bcrypt.genSalt(10);
        User.contrasena = await bcrypt.hash(User.contrasena, salt);

      }

    }  }
);
// compara contraseñas por medio del hasing 


export default Usuario
