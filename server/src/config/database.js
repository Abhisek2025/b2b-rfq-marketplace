import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",

    dialectOptions: {
      ssl: {
        require: true,
        ca: process.env.AIVEN_CA_CERT.replace(/\\n/g, "\n"),
        rejectUnauthorized: true,
      },
    },

    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ Aiven MySQL database connected successfully");
  } catch (error) {
    console.error(
      "❌ Aiven MySQL database connection failed:"
    );
    console.error(error.message);

    throw error;
  }
};

export default sequelize;
