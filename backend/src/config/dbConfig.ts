import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        // const url = process.env.MONGO_URL;
        // if(!url) throw new Error('Mongo url not defined in env');
        await mongoose.connect("mongodb+srv://jinan:hyjH8qJ9Jo2fpntc@cluster0.ox2k8.mongodb.net/ambulanceApp?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Mongo connected');
    }catch(err:any){
        console.error(err.message);
    }
}

