import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        // const url = process.env.MONGO_URL;
        // if(!url) throw new Error('Mongo url not defined in env');
        await mongoose.connect("mongodb://localhost:27017/emergencyAmbulance");
        console.log('Mongo connected');
    }catch(err:any){
        console.error(err.message);
    }
}

