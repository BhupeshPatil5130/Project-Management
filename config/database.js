import mongoose from "mongoose";

const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URl);
        console.log('MongoDB connected');
    }
    catch(error){
        
        console.log('MongoDB connection failed');
    }
}


export default dbconnect;