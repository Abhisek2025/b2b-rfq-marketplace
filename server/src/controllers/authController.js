import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

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
        console.error("Register user error", error);

    };
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
