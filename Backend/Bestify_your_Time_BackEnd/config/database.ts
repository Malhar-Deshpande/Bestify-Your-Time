
import { Sequelize} from "sequelize";
import * as dotenv from "dotenv";
import process from "process";
import sequelize from "sequelize";
dotenv.config();

export const database = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    dialect: "mysql" 
})
