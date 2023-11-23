import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


const viajes = (request, response) => {
  response.render('auth/viajes', {
    page: "Viajes",
    showHeader:true, 
    showFooter:true
  })
}

export {
  viajes
} 