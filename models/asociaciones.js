// Asociaciones.js
import TbbAutobus from './autobus.js';
import TbbAsiento from './asiento.js';
import TbbPersona from './persona.js';
import TbbEmpleado from './empleado.js';
import TbbViajes from './viajes.js';
import TbbRuta from './ruta.js';




TbbPersona.hasMany(TbbEmpleado, { foreignKey: 'px|ersonaId', sourceKey: 'id' });
TbbEmpleado.belongsTo(TbbPersona, { foreignKey: 'personaId', targetKey: 'id' });


TbbRuta.belongsTo(TbbViajes, { foreignKey: 'id', targetKey: 'id' });






