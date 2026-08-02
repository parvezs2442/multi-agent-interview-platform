import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

app.get("/", async(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Hello From Auth"
    })
})

app.listen(PORT, () => {
    console.log(`Auth is started at ${PORT}`)
    dbConnect()
})