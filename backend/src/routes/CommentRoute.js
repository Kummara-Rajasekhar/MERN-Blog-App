
const express=require("express")
const router=express.Router()


const Comment=require( "../model/CommentModel")


router.post('/post-comment',async(req,res)=>{
    try{
        const newComment=new Comment(req.body);
        await newComment.save()
        res.status(200).send({message:"Comment created successfully",comment:newComment})

    }catch(error){
        res.status(500).send({message:"An Error occured while posting new comment"})
    }
})

router.get('/total-comments',async(req,res)=>{
    try{ 
    const totalComment=await Comment.countDocuments({});
    res.status(200).send({message:"Total comments count",totalComment})

    }catch(error){
        res.status(500).send({message:"An error occured while geting comment count"});
    }
})


module.exports=router

