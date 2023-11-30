// Asociaciones.js
import TbbAutobus from './autobus.js';
import TbbAsiento from './asiento.js';
import Persona from './Persona.js';
import TbbEmpleado from './empleado.js';
import TbbViajes from './viaje.js';
import TbbRuta from './ruta.js';
import Usuario from './Usuario.js';
import TbbUbicacion from './ubicacion.js';


Persona.hasMany(TbbEmpleado, { foreignKey: 'personaId', sourceKey: 'id' });
TbbEmpleado.belongsTo(Persona, { foreignKey: 'personaId', targetKey: 'id' });



TbbAsiento.belongsTo(TbbAutobus, { foreignKey: 'autobusID', targetKey: 'id' });

Persona.hasOne(Usuario, { foreignKey: 'Persona_ID'});

TbbRuta.belongsTo(TbbUbicacion, { foreignKey: 'ubicacionID', targetKey: 'id' });






