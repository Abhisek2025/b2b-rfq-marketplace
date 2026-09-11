import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                success: false,
                message:"All Fields are required",
            });
        }
        if(!["BUYER","SUPPLIER"].includes(role)){
            return res.status(400).json({
                success: false,
                message: "Role Must be Buyer or Supplier",
            });
        }
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }
        const hashedPassword = await bcrypt.hash(
            password,
            12
        );
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(error){

    }
}
