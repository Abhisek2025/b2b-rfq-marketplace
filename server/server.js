import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import { sequelize,connectDatabase } from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";
import rfqRoutes from "./src/routes/rfqRoutes.js";
import RFQ from "./src/models/RFQ.js";
import Quotation from "./src/models/Quotation.js";
import quotationRoutes from "./src/routes/quotationRoutes.js";


dotenv.config();

const app = express();

app.use(helmet());

app.use(cors({
  origin: "https://quotebridge-beta.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/rfqs", rfqRoutes);
app.use("/api/quotations", quotationRoutes);
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
        await User.sync();
        await RFQ.sync();
        await Quotation.sync();

        console.log("Database ALL Table Synchronized");
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch(error){
        console.error("Server Startup failed", error.message);

        process.exit(1);
    }
};
startServer();
