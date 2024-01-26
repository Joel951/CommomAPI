import User from "../models/User.js";


export const updateUser = async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
    }
   
}


export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Deleted"});
    } catch (error) {
        console.log(error);
    }
   
}

export const findUser = async (req, res, next) => {

    try {
        const findUser = await User.find();
        res.status(201).json(findUser);
        res.send('Record fetch successfull');
    } catch (error) {
        next(error)
    }
   
}


export const findSingleUser = async (req, res, next) => {
const {username} = req.body;
    try {
        const findUser = await User.findOne({ username: username }); 
        res.status(201).json(findUser);
    } catch (error) {
        console.log(error);
    }
   
}