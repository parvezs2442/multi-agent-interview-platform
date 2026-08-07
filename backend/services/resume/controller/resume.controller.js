import { resumeAgent } from "../agents/resume.agent";
import extractText from "../config/pdf";
import Resume from "../model/resumeSchema.js";
import mongoose from "mongoose";
import redis from "../../../shared/redis.js"
import fs from "fs"
import { errorMonitor } from "stream";

export const uploadResume = async(req,res) => {
    try{

        const file = req.file;
        if(!file){
            return res.status(400).json({
                succes:false,
                message:"Resume pdf is required"
            })
        }

        const userId = req.headers["x-user-id"];
            if(userId){
            return res.status(400).json({
                succes:false,
                message:"userID  pdf is required"
            })
        }


        const resumeText = await extractText(file.path);
        const aiResponse = await resumeAgent(resumeText);

        const resumeData = JSON.parse(aiResponse)

        let resume = await Resume.findOne({userId})

        if(resume){
            Object.assign(resume,{
                ...resumeData,
                extractedText:resumeText
                }
            )
            await resume.save();
        }else{
            resume = await Resume.create({
                userId,
                extractedtext:resumeText,
                ...resumeData
            })
        }

        await redis.set(`resume:${userId}`, JSON.stringify(resume))

        await fs.unlink(file.path)

        return res.status(200).json({
            success:true,
            message:"Resume analyzed successfully",
            data:resume
        })
        


    }catch(error){
        console.log(error)
        if(file.path){
            await fs.unlink(file.path)
        }
        return res.status(400).json({

            success:false,
            message:"Resume analyzed Failed",

        })
    }

}


