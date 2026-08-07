import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        index:true
    },
    extractedtext:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    summary:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    education:{
        type:[String],
        default:[]
    },
    skills:{
        type:[String],
        default:[]
    },
    project:{
        type:[String],
        default:[]
    },
    experience:{
        type:[String],
        default:[]
    },
    strengths:{
        type:[String],
        default:[]
    },
    weakness:{
        type:[String],
        default:[]
    },
    missingSkils:{
        type:[String],
        default:[]
    },
    suggestedRole:{
        type:String,
    },
    recommendations:{
        type:[String],
        default:[]
    }


}, {timestamps:true})

const Resume = mongoose.model("Resume", resumeSchema)
export default Resume