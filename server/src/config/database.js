import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,

    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

export const connectDatabase = async()=>{
    try{
        await sequelize.authenticate();
        console.log("MYSQL database connected successfully");
    } 
    catch(error){
        console.error("Connection Failed", error.message);
        throw error;
    }
};
export {sequelize};

