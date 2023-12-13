import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config({ path: "src/.env" });
const usuarios = [
    {
        name: 'Marco', email: 'marcodeveloper@gmail.com', password: bcrypt.hashSync('marco', 10)

    },
    {
        name: 'Zacek', email: 'eldiosdelsexo@gmail.com', password: bcrypt.hashSync('unlocoentucasa', 10)
    },
    {
        name: 'Martin', email: 'elvargas@gmail.com', password: bcrypt.hashSync('vargas1234', 10)
    },
    {
        name: 'Raul', email: 'raul123@gmal.com', password: bcrypt.hashSync('raul12345', 10)
    },
    
    {
        name: 'Edgar', email: 'degar@gmail.com', password: bcrypt.hashSync('ederdal1234', 10)
    },
   
]
export default usuarios