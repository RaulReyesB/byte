import dotenV from 'dotenv';
import nodemailer from "nodemailer"
import { request, response } from 'express';
dotenV.config({ path: "src/.env" })


const emailRegister = async (userData, personaData) => {
  const { nombre, correoElectronico, token } = userData;
  console.log('Correo electrónico:', correoElectronico);
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  try {
    await transport.sendMail({
      from: "ByteBus.com",
      to: correoElectronico,
      subject: "Bienvenido a Byte Bus - Confirma tu cuenta",
      text: "Gracias por elegirnos sobre todas las opciones, le aseguramos que somos la mejor opcion para usted",
      html: `
    <!DOCTYPE html>
    <html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
    
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: Arial, sans-serif;
        }
    
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #ADD8E6; /* Azul Claro */
            text-decoration: none !important;
            font-weight: bold;
          }
    
          .col-lge {
            max-width: 100% !important;
          }
        }
    
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
    
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    
    <body style="margin: 0; padding: 0; word-spacing: normal; background-color: #ADD8E6;">
      <div role="article" aria-roledescription="email" lang="es" style="text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #ADD8E6;">
        <table role="presentation" style="width: 100%; border: none; border-spacing: 0;">
          <tr>
            <td align="center" style="padding: 0;">
    
              <table role="presentation"
                style="width: 94%; max-width: 600px; border: none; border-spacing: 0; text-align: left; font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color: #363636;">
                <tr>
                  <td style="padding: 40px 30px 30px 30px; text-align: center; font-size: 24px; font-weight: bold;">
                    <img src="cid:logo_escrito" width="165" alt="Logo"
                      style="width: 165px; max-width: 80%; height: auto; border: none; text-decoration: none; color: #ffffff;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; background-color: #ffffff;">
                    <h1 style="margin-top: 0; margin-bottom: 16px; font-size: 26px; line-height: 32px; font-weight: bold; letter-spacing: -0.02em;">
                      ¡Bienvenido a nuestra aplicación para nuevos usuarios!
                    </h1>
                    <p style="margin: 0;">
                      Bienvenido a Byte Bus, tu destino de confianza para viajes cómodos y seguros. Estamos emocionados de tenerte a bordo y queremos agradecerte por elegirnos para tus viajes., <a href="www.capu.com.mx"
                        style="color: #e50d70; text-decoration: underline;">${nombre}</a>, nos esforzamos por brindarte la mejor experiencia de viaje posible. Ya sea que estés viajando por negocios, placer o cualquier otra razón, estamos aquí para hacer que tu viaje sea placentero y sin complicaciones.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0; font-size: 24px; line-height: 28px; font-weight: bold;">
                    
                      <img src="cid:logo" width="600" alt="100"
                        style="width: 100%; height: auto; display: block; border: none; text-decoration: none; color: #363636;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    style="padding: 35px 30px 11px 30px; font-size: 0; background-color: #ffffff; border-bottom: 1px solid #f0f0f5; border-color: rgba(201, 201, 207, .35);">
                    <div class="col-sml"
                      style="display: inline-block; width: 100%; max-width: 145px; vertical-align: top; text-align: left; font-family: Arial, sans-serif; font-size: 14px; color: #363636;">
                      <img src="cid:mexico_publicidad" width="115" alt="50"
                        style="width: 115px; max-width: 80%; margin-bottom: 20px;">
                    </div>
                    <div class="col-lge"
                      style="display: inline-block; width: 100%; max-width: 395px; vertical-align: top; padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color: #363636;">
                      <p style="margin-top: 0; margin-bottom: 12px;">
                        Con nuestro sistema en línea, puedes realizar y gestionar tus reservas de manera fácil y conveniente.
                      </p>
                      <p style="margin-top: 0; margin-bottom: 18px;">
                        Tu seguridad es nuestra prioridad. Contamos con medidas y protocolos para garantizar viajes seguros y tranquilos.
                      </p>
                      <p style="  background-color: #8b8bec;
                      color: #fff;
                      padding: 10px 20px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      border-radius: 5px;">
                        <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/user/confirm/${token}">
                          CONFIRMAR CUENTA
                        </a>
                      </p>
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style="padding: 30px; font-size: 24px; line-height: 28px; font-weight: bold; background-color: #ffffff; border-bottom: 1px solid #f0f0f5; border-color: rgba(201, 201, 207, .35);">
                    <a href="http://www.example.com/" style="text-decoration: none;"><img src="" width="540" alt=""
                        style="width: 100%; height: auto; border: none; text-decoration: none; color: #363636;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; background-color: #ffffff;">
                    <p style="margin: 0;">
                      Disfruta de viajes cómodos con nuestras modernas instalaciones, asientos reclinables, conexión Wi-Fi y más.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="padding: 30px; text-align: center; font-size: 12px; background-color: #404040; color: #cccccc;">
                    <p style="margin: 0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration: none;"><img
                          src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f"
                          style="display: inline-block; color: #cccccc;"></a> <a href="http://www.twitter.com/"
                        style="text-decoration: none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40"
                          height="40" alt="t" style="display: inline-block; color: #cccccc;"></a></p>
                    <p style="margin: 0; font-size: 14px; line-height: 20px;">&reg; Alguien, en algún lugar 2021<br><a
                        class="unsub" href="http://www.example.com/" style="color: #cccccc; text-decoration: underline;">Cancelar suscripción
                        instantáneamente</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    
    </html>
    
  `,
      attachments: [
        {
          filename: 'logo_escrito.png',
          path: 'public/img/logo_escrito.png',
          cid: 'logo_escrito',
        },
        {
          filename: 'logo.png',
          path: 'public/img/logo.jpg',
          cid: 'logo',
        },
        {
          filename: 'mexico_publicidad.png',
          path: 'public/img/mexico_publicidad.jpg',
          cid: 'mexico_publicidad',
        },
      ],
    })
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
  console.log(`************Se esta intentando enviar un correo electronico al usuario: ${userData.correoElectronico}, con el token de validacion: ${userData.token}*************`)

}

const correoRestaurarContrasena = async (userData) => {

  const { correoElectronico, tokenPassword } = userData;

  console.log('Correo electrónico:', correoElectronico);


  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });


  await transport.sendMail({
    from: "ByteBus.com",
    to: correoElectronico,
    subject: "RealState - 220087 -  Reset your Password",
    text: `We have recieved your password change request, please follow the link below.`,
    html: `
    <!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>

  <style>
    table,
    td,
    div,
    h1,
    p {
      font-family: Arial, sans-serif;
    }

    @media screen and (max-width: 530px) {
      .unsub {
        display: block;
        padding: 8px;
        margin-top: 14px;
        border-radius: 6px;
        background-color: #ADD8E6; /* Azul Claro */
        text-decoration: none !important;
        font-weight: bold;
      }

      .col-lge {
        max-width: 100% !important;
      }
    }

    @media screen and (min-width: 531px) {
      .col-sml {
        max-width: 27% !important;
      }

      .col-lge {
        max-width: 73% !important;
      }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; word-spacing: normal; background-color: #ADD8E6;">
  <div role="article" aria-roledescription="email" lang="es" style="text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #ADD8E6;">
    <table role="presentation" style="width: 100%; border: none; border-spacing: 0;">
      <tr>
        <td align="center" style="padding: 0;">

          <table role="presentation"
            style="width: 94%; max-width: 600px; border: none; border-spacing: 0; text-align: left; font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color: #363636;">
            <tr>
              <td style="padding: 40px 30px 30px 30px; text-align: center; font-size: 24px; font-weight: bold;">
                <img src="/logo_escrito.png" width="165" alt="Logo"
                  style="width: 165px; max-width: 80%; height: auto; border: none; text-decoration: none; color: #ffffff;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background-color: #ffffff;">
                <h1 style="margin-top: 0; margin-bottom: 16px; font-size: 26px; line-height: 32px; font-weight: bold; letter-spacing: -0.02em;">
                  ¡Cambio de contraseña solicitado!
                </h1>
                <p style="margin: 0;">
                  Hola, <a href="www.capu.com.mx" style="color: #e50d70; text-decoration: underline;">${name}</a>. Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en Byte Bus. Si no has solicitado este cambio, por favor ignora este mensaje. De lo contrario, haz clic en el siguiente enlace para restablecer tu contraseña:
                </p>
                <p style="margin: 0;">
                  <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/user/cambiar-contrasena/${tokenPassword}"
                    style="color: #e50d70; text-decoration: underline;">Restablecer Contraseña</a>
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="padding: 35px 30px 11px 30px; font-size: 0; background-color: #ffffff; border-bottom: 1px solid #f0f0f5; border-color: rgba(201, 201, 207, .35);">
                <div class="col-sml"
                  style="display: inline-block; width: 100%; max-width: 145px; vertical-align: top; text-align: left; font-family: Arial, sans-serif; font-size: 14px; color: #363636;">
                  <img src="/mexico_publicidad.jpg" width="115" alt="50"
                    style="width: 115px; max-width: 80%; margin-bottom: 20px;">
                </div>
                <div class="col-lge"
                  style="display: inline-block; width: 100%; max-width: 395px; vertical-align: top; padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color: #363636;">
                  <p style="margin-top: 0; margin-bottom: 12px;">
                    Con Byte Bus, mantenemos tus datos seguros. Haz clic en el enlace anterior para cambiar tu contraseña de manera segura.
                  </p>
                  <p style="  background-color: #8b8bec;
                  color: #fff;
                  padding: 10px 20px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  border-radius: 5px;">
                    <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/user/cambiar-contrasena/${tokenPassword}">
                      RESTABLECER CONTRASEÑA
                    </a>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style="padding: 30px; font-size: 24px; line-height: 28px; font-weight: bold; background-color: #ffffff; border-bottom: 1px solid #f0f0f5; border-color: rgba(201, 201, 207, .35);">
                <a href="http://www.example.com/" style="text-decoration: none;"><img src="" width="540" alt=""
                    style="width: 100%; height: auto; border: none; text-decoration: none; color: #363636;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background-color: #ffffff;">
                <p style="margin: 0;">
                  Cambia tu contraseña y disfruta de una experiencia segura con Byte Bus.
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="padding: 30px; text-align: center; font-size: 12px; background-color: #404040; color: #cccccc;">
                <p style="margin: 0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration: none;"><img
                      src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f"
                      style="display: inline-block; color: #cccccc;"></a> <a href="http://www.twitter.com/"
                    style="text-decoration: none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40"
                      height="40" alt="t" style="display: inline-block; color: #cccccc;"></a></p>
                <p style="margin: 0; font-size: 14px; line-height: 20px;">&reg; Alguien, en algún lugar 2021<br><a
                    class="unsub" href="#" style="color: #cccccc; text-decoration: underline;">Cancelar suscripción
                    instantáneamente</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>
      `
  });

  console.log(`
      ######### MailTrap ############ \n 
          Se está intentando enviar un correo de Cambio de Contraseña al usuario: ${correoElectronico}, con el token de validación: ${tokenPassword} 
      \n #####################`,

  );
}

export {
  emailRegister,
  correoRestaurarContrasena
}