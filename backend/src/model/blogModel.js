const mongoose=require('mongoose')

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    content:{
        type:String,
        required:true
    },
    conImg:String,
    category:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
})



const BlogModel= mongoose.model("Blog",BlogSchema)
module.exports= BlogModel