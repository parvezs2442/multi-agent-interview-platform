import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./controller/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

const PORT = process.env.PORT || 3000

app.get("/", async(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Hello From Gateway"
    })
})

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});

app.use("/api/auth", proxy(process.env.AUTH_API_URL))
app.use("/api/me",isAuth,  getCurrentUser)

app.listen(PORT, () => {
    console.log(`Gateway is started at ${PORT}`)
})