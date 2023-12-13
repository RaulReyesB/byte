const puppeteer = require('puppeteer');
const pug = require('pug');
const fs = require('fs');

async function convertToPDF() {
  // Renderiza la vista .pug a HTML
  const compiledFunction = pug.compileFile('../views/compra/registro.pug'); // Reemplaza 'ruta/a/tu/archivo.pug' con la ruta correcta
  const htmlContent = compiledFunction({}); // Puedes pasar datos aquí si tu vista Pug lo requiere

  // Inicia Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Establece el contenido HTML en la página
  await page.setContent(htmlContent);

  // Genera el PDF
  await page.pdf({ path: 'boleto.pdf', format: 'A4' }); // Cambia el nombre del archivo si es necesario

  // Cierra el navegador
  await browser.close();

  console.log('Archivo PDF generado correctamente');
}

convertToPDF().catch((error) => console.error(error));