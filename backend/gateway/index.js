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
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, postman, curl)
        // or matching localhost origins on any port for development
        if (!origin || origin.startsWith("http://localhost:")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
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
app.get("/api/me",isAuth,  getCurrentUser)

app.listen(PORT, () => {
    console.log(`Gateway is started at ${PORT}`)
})