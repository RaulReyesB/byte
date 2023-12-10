import dotenv from "dotenv";
dotenv.config({ path: "src/.env" })
import jwt from "jsonwebtoken";
import Usuario from '../models/Usuario.js'

const protegerRuta = async (req, res, next) => {
  console.log("Hola desde el middleware")
  //Verificar la existencia de un token
  const { _token } = req.cookies;
  console.log('_token:', _token);
  console.log('Cookies:', req.cookies);

  // Verificar si ya está en la página de inicio de sesión
  if (req.path === '/user/login' && !_token) {
    return next(); // Evitar redirección circular
  }
  
  if (!_token) {
    console.log('No se encontró el token, redirigiendo a /login');

    return res.redirect('/user/login')
  }
  //Verificar el token 
  try {
    const decodedJWT = jwt.verify(_token, process.env.JWT_HASHSTRING)
    //console.log(decodedJWT)
    const loggedUser = await Usuario.findByPk(decodedJWT.userId)
    if (!loggedUser) {
      //console.log("El usuario no existe")
      return res.clearCookie("_token").redirect("/user/login")
    } else {
      req.User = loggedUser

    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.clearCookie("_token").redirect("/user/login")
  }

  next()
}


export default protegerRuta;