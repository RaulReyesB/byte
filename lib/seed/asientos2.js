

const asientos2 = [];

const autobusID = 2;
const totalAsientos = 32;

for (let numero = 1; numero <= totalAsientos; numero++) {
  const tipo = (numero >= 1 && numero <= 15 && numero % 2 !== 0) || (numero >= 18 && numero % 2 === 0)
    ? 'Ventana'
    : 'Pasillo';

  const asiento = {
    autobusID,
    numero,
    tipo: 'Normal',
    estatus: true,
    identificador: 'A1',
    zona: tipo,
  };

  asientos2.push(asiento);
}

export default asientos2;
