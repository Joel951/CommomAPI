import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) =>{

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        await newUser.save();
        res.status(200).json({message:"User Registered"})
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req,res,next) =>{

    try {
     const user = await User.findOne({username:req.body.username});
     if(!user){
         return next(createError(404, "User not found"))
     }

     const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
     if(!isPasswordCorrect){
         return next(createError(401, "Invalid password"))
     }
     //generate token
     const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)

     const {password,isAdmin,...otherDetails} = user._doc

     //setting token to cookies and sending response
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json({...otherDetails})
    } catch (error) {
        console.log(error);
    }
}