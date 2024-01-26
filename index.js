import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser';





const app = express();
const PORT = process.env.PORT || 4000;


const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        }catch(err){
            console.log(err);
        }
}

//middleware function
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/hotels',hotelRoute);

app.use((err,req,res,next) => {
   const errStatus = err.status || 500;
   const errMessage = err.message || "Something went wrong"
   return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    satck:err.stack
   });
})


app.listen(PORT,()=>{
    connect();
    console.log(`Connected to DB & Server running on port ${PORT}`);
});

