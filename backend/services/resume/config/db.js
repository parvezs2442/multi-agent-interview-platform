
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Resume Database Connected")

    }catch(error){
        console.log("Error connecting Resume DB", error)
    }
}