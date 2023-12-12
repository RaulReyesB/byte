import { exit } from 'node:process'
import db from "../../config/db.js"
import { truncate } from 'node:fs';
import Viaje from '../../models/Viaje.js';
import viajes from './viajes.js';
import Horario from '../../models/Horario.js';
import horarios from './horarios.js';
import Asiento from '../../models/asiento.js';
import asientos1 from './asientos1.js';
import asientos2 from './asientos2.js';
import asientos3 from './asientos3.js';
import Autobus from '../../models/autobus.js';
import autobuses from './autbuses.js';

const importData = async () => {
    try {
        // Autenticar 
        await db.authenticate()

        // Generar columnas 
        await db.sync()

        // insertar los datos 
        await Promise.all([
            Viaje.bulkCreate(viajes)
        ]);
        await Promise.all([
            Horario.bulkCreate(horarios)
        ]);
        await Promise.all([
            Autobus.bulkCreate(autobuses)
        ]);
        await Promise.all([
            Asiento.bulkCreate(asientos1)
        ]);
        await Promise.all([
            Asiento.bulkCreate(asientos2)
        ]); 
        await Promise.all([
            Asiento.bulkCreate(asientos3)
        ]);
        console.log('Datos Importados Correctamente')
        exit()//1 con error 


    } catch (error) {
        console.log(error)
        exit(1)
    }
}
const deleteData = async () => {
    try {
        await Promise.all([
            Viaje.destroy({
                where: {}, truncate: false
            }),
            db.query("ALTER TABLE tbc_viajes AUTO_INCREMENT=1"),
        ])
    }
    catch (error) {
        console.log(error)
        exit(1)
    }
}

if (process.argv[2] === "-i") {
    importData();
}
if (process.argv[2] === "-d") {
    deleteData();
}