
import redis from "../../shared/redis.js"


export const isAuth = async(req,res,next)=> {
    try{
        const sessionId = req.cookies?.session

        if(!sessionId){
            return res.status(401).json({
                status:false,
                message:"Unauthorized"
            })
        }

        const session = redis.get(`session:${sessionId}`)
        if(!session){
            return res.status(401).json({
                status:false,
                message:"Session Expired"
            })
        }

        req.user = JSON.parse(session)
        next();

    }catch(error){
        return res.status(401).json({
            status:false,
            message:"isAuth Failed"
        })
        
    }
}