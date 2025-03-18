const mongoose=require('mongoose')

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    content:String,
    conImg:String,
    category:String,
    author:String,
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const BlogModel= mongoose.model("Blog",BlogSchema)
module.exports= BlogModel