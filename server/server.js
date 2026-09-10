import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { connectDatabase } from "./src/config/database.js";
dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());
app.get("/api/health", (req,res)=>{
    res.status(200).json({
        success: true,
        message:"RFQ Marketplace API is running now",
        user:"successfully Api running",
    });
});

const PORT = process.env.PORT || 5000;
const startServer = async()=>{
    try{
        await connectDatabase(); 
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch(error){
        console.error("Server Startup failed", error.message);

        process.exit(1);
    }
};
startServer();

