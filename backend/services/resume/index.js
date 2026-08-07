import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./config/db.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.get("/", async(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Hello From Resume Server"
    })
})


app.listen(PORT, () => {
    console.log(`Resume server is listening at port ${PORT}`)
    dbConnect()
})