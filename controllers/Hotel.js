import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        const errorMessage = "Error saving";
        next(error);
    }
}


export const updateHotel = async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(201).json(updateHotel);
    } catch (error) {
        console.log(error);
    }
   
}


export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Deleted"});
    } catch (error) {
        console.log(error);
    }
   
}

export const findHotel = async (req, res, next) => {

    try {
        const findHotel = await Hotel.find();
        res.status(201).json(findHotel);
        res.send('Record fetch successfull');
    } catch (error) {
        next(error)
    }
   
}


export const findSingleHotel = async (req, res, next) => {

    try {
        const findHotel = await Hotel.findOne({ _id: req.params.id }); 
        res.status(201).json(findHotel);
    } catch (error) {
        console.log(error);
    }
   
}