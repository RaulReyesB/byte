import dotenV from 'dotenv';
import nodemailer from "nodemailer"

dotenV.config({path: "src/.env"})

const emailRegister = async (userData) => {

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const {name,email,token}=userData;

  await transport.sendMail({
    from: "RealState-220217.com",
    to: email,
    subject: "Welcome to RealState - 220217 - confirm your account",
    text: "Thank you for chasing us, in our platform you could sell and buy properties, to continue please follow confirmation link below",
    html: `
    <html>
      <head>
        <style>
          /* Estilos CSS para el mensaje de correo electrónico */
          body {
            font-family: Arial, sans-serif;
            background-color: #ffaf87;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px; /* Agrega bordes redondeados */
          }
          .header {
            background-color: #B8B8FF;
            color: #fff;
            text-align: center;
            padding: 20px;
          }
          .message {
            background-color: #F8F7FF;
            padding: 20px;
          }
          .button {
            background-color: #B8B8FF;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
          }
          .signature {
            background-color: #F4F4F4;
            padding: 20px;
            border-top: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to RealState</h1>
          </div>
          <div class="message">
            <p>Hello, ${name}, you are verifying your account on RealState.com.</p>
            <p>Your account is almost active. Please follow the activation link below:</p>
            <p>
              <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}">CONFIRMAR CUENTA</a>
            </p>
            <p>If you didn't create this account, just ignore this email.</p>
            <img src="https://www.altonivel.com.mx/assets/images/Estructura_2015/Estilo_de_vida/Imagen/firma-izquierda.jpg" alt="Descripción de la imagen" style="max-width: 100px; height: 100;">
            </div>
          
          </div>
        </div>
      </body>
    </html>
  `,
});

  console.log(`************Se esta intentando enviar un correo electronico al usuario: ${userData.email}, con el token de validacion: ${userData.token}*************`)

}

export{emailRegister}