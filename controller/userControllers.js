import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


const formularioLogin = (request, response) => {
  response.render('auth/login', {
    page: "Iniciar Sesion",
    showHeader:true, 

  })
}

const formularioRegistro = (request, response) => {
  response.render('auth/register.pug', {
    page: 'Nueva cuenta',
    showHeader:true, 
  })
}

const formularioOlvidoContra = (request, response) => {
  response.render('auth/forgot-password.pug', {
    page: 'Olvide Contraseña',
    showHeader:true, 
  })
}

const tiket = (request, response) => {
  response.render('auth/ticket.pug', {
    page: tiket
  })
}

/*
const insertUser = async (request, response) => {
  await check("name").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({min: 4}).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({max: 15}).withMessage("El nombre debe contener 15 caracteres maximo").run(request)

  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("password").notEmpty().withMessage("Este campo es OBLIGATORIO: PASSWORD").isLength({min: 8}).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({max: 20}).withMessage("Password must contain less than 20 characters").equals(request.body.cpassword).withMessage("Both password must be the same").run(request)
}
*/
//llamada via http request, response 
const insertarUsuario = async (request, response) => {  

  console.log("El usuario está intentando registrar sus datos en la base de datos");
  console.log(`Nombre: ${request.body.name}`);
  const { name, email, password, birthdate } = request.body;


  await check("name").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({min: 4}).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({max: 15}).withMessage("El nombre debe contener 15 caracteres maximo").run(request)
  
  await check("apat").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({min: 4}).withMessage("El apellido debe contener 4 caracteres como minimo").isLength({max: 15}).withMessage("El apellido debe contener 15 caracteres maximo").run(request)

  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("password").notEmpty().withMessage("Este campo es OBLIGATORIO: PASSWORD").isLength({min: 8}).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({max: 20}).withMessage("Password must contain less than 20 characters").equals(request.body.cpassword).withMessage("Ambas contraseñas deben ser iguales").run(request)
  
  await check("birthdate").notEmpty().withMessage("Este campo es OBLIGATORIO: Fecha de Nacimiento").run(request);

  let resultadoValidacion = validationResult(request);


  if (resultadoValidacion.isEmpty()) {
    // Si el usuario pasa todas las validaciones, continuas con el registro
    const token = generateID();
    console.log(`Intentando insertar al usuario: ${name}, con el email: ${email}, con la contraseña: ${password} y token: ${token}`);

    // Validation duplicate user
    const userExists = await User.findOne({ where: { email: email } });
  
  // Validación de edad del usuario

  if (!birthdate) {
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader:true,
      errors: [{ msg: "Fecha de nacimiento requerida." }],
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  }

  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Validar si el usuario es menor de 18 años
  if (age < 18) {
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader:true,
      errors: [{ msg: "Tienes que tener al menos 18 añOs para registrarte." }],
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  }
    if (userExists) {
      return response.render("auth/register.pug", {
        pagina: "Creando nueva cuenta",
        showHeader:true,
        errors: [{ msg: `El usuario con correo ${email} ya esta registrado, intenta con otro correo` }],
        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        token
      });

      // Enviar el correo de confirmacion
      emailRegister({name,email,token});

      response.render("templates/message.pug",{
        page: "Info Message",
        showHeader:true,
        type: "Info",
        notificationTitle: "Usuario creado",
        notificationMessage: `The user associated to: ${email} has been created, please check your email for account verification`
      })
    }
  } else {
    // Si hay errores en otras validaciones, muestra los errores
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader:true,  
      errors: resultadoValidacion.array(),
      user: {
        name: request.body.name,
        email: request.body.email,
        birthdate: request.body.birthdate
      }
    });
  }
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra,
  tiket,
  insertarUsuario
}
