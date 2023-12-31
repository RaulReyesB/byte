// Asociaciones.js
import Autobus from './Autobus.js';
import Asiento from './Asiento.js';
import Boleto from './Boleto.js';
import Persona from './Persona.js';
import TbbEmpleado from './empleado.js';
import TbbRuta from './ruta.js';
import Usuario from './Usuario.js';
import TbbUbicacion from './ubicacion.js';
import Viaje from './Viaje.js';
import Horario from './Horario.js';
import { DataTypes, Model } from "sequelize";

Persona.hasMany(TbbEmpleado, { foreignKey: 'personaId', sourceKey: 'id' });
TbbEmpleado.belongsTo(Persona, { foreignKey: 'personaId', targetKey: 'id' });

Horario.belongsTo(Viaje, { foreignKey: 'viajeId' });
Viaje.hasMany(Horario, { as: 'horarios', foreignKey: 'viajeId' });

Asiento.belongsTo(Autobus, { foreignKey: 'autobusID', targetKey: 'id' });

Viaje.associate = (models) => {
  Viaje.belongsTo(models.Autobus, { foreignKey: 'autobusId', as: 'autobus' });
  Viaje.hasMany(models.Horario, { as: 'horarios', foreignKey: 'viajeId' });
};

Boleto.belongsTo(Asiento, { foreignKey: 'asientoId' });


Persona.hasOne(Usuario, { foreignKey: 'Persona_ID'});

TbbRuta.belongsTo(TbbUbicacion, { foreignKey: 'ubicacionID', targetKey: 'id' });
