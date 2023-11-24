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


const insertUser = async (request, response) => {
  await check("name").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({min: 4}).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({max: 15}).withMessage("El nombre debe contener 15 caracteres maximo").run(request)

  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("password").notEmpty().withMessage("Este campo es OBLIGATORIO: PASSWORD").isLength({min: 8}).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({max: 20}).withMessage("Password must contain less than 20 characters").equals(request.body.cpassword).withMessage("Both password must be the same").run(request)
}

//llamada via http request, response 
const insertarUsuario = async (request, response) => {
  console.log("El usuario está intentando registrar sus datos en la base de datos");
  console.log(`Nombre: ${request.body.name}`);

  // Validación de edad del usuario
  const { birthdate } = request.body;

  if (!birthdate) {
    return response.render("auth/register.pug", {
      pagina: "Creating New Account",
      errors: [{ msg: "Date of birth is required." }],
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
      pagina: "Creating New Account",
      errors: [{ msg: "You must be at least 18 years old to register." }],
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  }

  // Continuar con las otras validaciones
  await check("name").notEmpty().withMessage("This field is required").run(request);
  await check("email").notEmpty().withMessage("This field is required").isEmail().withMessage("The value must be in the format user@domain.ext").run(request);
  await check("password").notEmpty().withMessage("This field is REQUIRED: PASSWORD").isLength({ min: 8 }).withMessage("Password must contain at least 8 characters").isLength({ max: 20 }).withMessage("Password must contain less than 20 characters").equals(request.body.password).withMessage("Both password must be the same").run(request);
  await check("birthdate").notEmpty().withMessage("This field is required").run(request);

  // ... Otras validaciones ...

  let resultadoValidacion = validationResult(request);

  if (resultadoValidacion.isEmpty()) {
    // Si el usuario pasa todas las validaciones, continuas con el registro
    const { name, email, password } = request.body;
    const token = generateID();
    console.log(`Intentando insertar al usuario: ${name}, con el email: ${email}, con la contraseña: ${password} y token: ${token}`);

    // Validation duplicate user
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      return response.render("auth/register.pug", {
        pagina: "Creating New Account",
        errors: [{ msg: "User with this email already exists." }],
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
        type: "Info",
        notificationTitle: "User Created",
        notificationMessage: `The user associated to: ${email} has been created, please check your email for account verification`
      })
    }
  } else {
    // Si hay errores en otras validaciones, muestra los errores
    return response.render("auth/register.pug", {
      pagina: "Creating New Account",
      errors: resultadoValidacion.array(),
      user: {
        name: request.body.name,
        email: request.body.email
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
