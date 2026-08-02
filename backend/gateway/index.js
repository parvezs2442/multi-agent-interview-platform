import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.get("/", async(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Hello From Gateway"
    })
})

app.use("/api/auth", proxy(process.env.AUTH_API_URL))

app.listen(PORT, () => {
    console.log(`Gateway is started at ${PORT}`)
})