import { isAuth } from "../middleware/isAuth.js"

export const getCurrentUser = async(req,res) => {
    try{
        return res.status(200).json({
                status:true,
                message:"user details -> ",
                user: req.user
        })

    }catch(error){
        return res.status(401).json({
            status:false,
            message:"Unauthorized"
        })
        
    }
}