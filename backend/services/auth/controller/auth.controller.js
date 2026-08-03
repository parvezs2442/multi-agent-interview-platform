import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth"
import User from "../model/user.model.js"
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js";

 
export const GoogleAuth = async(req,res) => {
    try{
        //fetch token and verify token using firebase
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);

        //check existing user
        let user = await User.findOne({
            firebaseUid:decoded.uid
        })

        //create a user if no user
        if(!user){
            user = await User.create({
                firebaseUid:decioded.uid,
                name:decoded.name,
                email:decoded.email
            })
        }

        //generate session id and send in cookie
        const sessionId = crypto.randomUUID();
        
        await redis.set(`session:${sessionId}`, JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            interviewCoin:user.interviewCoin
        }), "EX", 7*24*60*60*1000)
        
        res.cookie("sessionId", sessionId, {
            httponly:true,
            maxAge: 7*24*60*60*1000
        })

        return res.status(201).json({
            success:true,
            user
        })


    }catch(error){
        console.log(error)
        return res.status(201).json({
            success:false,
            message:"Something went wrong"
        })
    }
}  

export const Logout = async(req,res) => {
    try{
        const sessionId = req.cookies?.session
        if(sessionId){
            await redis.del(`session:${sessionId}`)
        }
        res.clearCookie("session")

        return res.status(200).json({
            success:true,
            message:"Logout Success"
        })
    }catch(error){
        return res.status(200).json({
            success:false,
            message:"Logout Failed"
        })
    }
}