// Asociaciones.js
import TbbAutobus from './autobus.js';
import TbbAsiento from './asiento.js';
import Persona from './Persona.js';
import TbbEmpleado from './empleado.js';
import TbbRuta from './ruta.js';
import Usuario from './Usuario.js';
import TbbUbicacion from './ubicacion.js';
import Viaje from './Viaje.js';
import Horario from './Horario.js';

Persona.hasMany(TbbEmpleado, { foreignKey: 'personaId', sourceKey: 'id' });
TbbEmpleado.belongsTo(Persona, { foreignKey: 'personaId', targetKey: 'id' });

Horario.belongsTo(Viaje, { foreignKey: 'viajeId' });
Viaje.hasMany(Horario, { as: 'horarios', foreignKey: 'viajeId' });

TbbAsiento.belongsTo(TbbAutobus, { foreignKey: 'autobusID', targetKey: 'id' });

Persona.hasOne(Usuario, { foreignKey: 'Persona_ID'});

TbbRuta.belongsTo(TbbUbicacion, { foreignKey: 'ubicacionID', targetKey: 'id' });
