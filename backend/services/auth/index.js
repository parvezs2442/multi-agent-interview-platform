import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./config/db.js";
import authRouter from "./route/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    console.log("Auth Service received:", req.method, req.url);
    next();
});

const PORT = process.env.PORT || 3001

app.get("/", async(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Hello From Auth"
    })
})

app.use("/", authRouter)

app.listen(PORT, () => {
    console.log(`Auth is started at ${PORT}`)
    dbConnect()
})