import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({path:"SRC/.env"})


const db = new Sequelize(process.env.BD_NAME,process.env.BD_USER,process.env.BD_PASSWORD,{
    host:process.env.BD_HOST,
    port:"3309",
    dialect:"mysql",
    define:{timestamp:true},
    pool:{
        max:5,
        min:0,
        acquire:60000,
        idle:10000,
        operatorAliases:false
    }
})

export default db