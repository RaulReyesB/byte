// Asociaciones.js
import TbbAutobus from './autobus.js';
import TbbAsiento from './asiento.js';
import TbbPersona from './persona.js';
import TbbEmpleado from './empleado.js';
import TbbViajes from './viajes.js';
import TbbRuta from './ruta.js';
import User from './User.js';
import TbbUbicacion from './ubicacion.js';


TbbPersona.hasMany(TbbEmpleado, { foreignKey: 'personaId', sourceKey: 'id' });
TbbEmpleado.belongsTo(TbbPersona, { foreignKey: 'personaId', targetKey: 'id' });


TbbRuta.belongsTo(TbbViajes, { foreignKey: 'id', targetKey: 'id' });

TbbAsiento.belongsTo(TbbAutobus, { foreignKey: 'autobusID', targetKey: 'id' });

TbbPersona.belongsTo(User, { foreignKey: 'id', targetKey: 'personaID' });

TbbRuta.belongsTo(TbbUbicacion, { foreignKey: 'ubicacionID', targetKey: 'id' });






