import { DataTypes } from "sequelize";
import db from "../config/db.js";
import TbbPersonas from "./tbb_personas.js";

const TbbUsers = db.define("tbb_users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tbb_personas',
      key: 'id',
    },
  },
});

// Realiza la transformación y la inserción en la base de datos
db.query(
  `INSERT INTO tbb_users (name, email, password, personaID)
   SELECT CONCAT(nombre, ' ', apellidoPaterno) as name, correoElectronico as email, 'defaultPassword' as password, id as personaID
   FROM tbb_personas;`
)
  .then(([result]) => {
    console.log('Número de filas afectadas:', result.affectedRows);
  })
  .catch((error) => {
    console.error('Error al crear los usuarios:', error);
  });
