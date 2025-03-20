const express=require('express')
const { default: BlogModel } = require('../model/blogModel')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')

router.get('/',async(req,res)=>{
    try{

        const {search,creatory,location}=req.query;
        let query={}
        if(search){
            query={
                ...query,
                $or:[
                    {title:{$regex:search,$options:"i"}},
                    {content:{$regex:search,$options:"i"}}
                ]
            }
        }
        if(creatory){
            query={
                ...query,
                creatory
            }
        }
        if(location){
            query={
                ...query,
                location
            }
        }

        const post= await BlogModel.find(query).populate('author','email').sort({createdAt:-1});
        res.status(200).send({
            message:"All Posts retrived successfully",
            posts:post
        })
    }catch(error){
        res.status(500).send({message:"Error creating post"})
    }
})
router.post("/create-post",verifyToken,isAdmin,async()=>{
    try{
        const newPost=new BlogModel({...req.body,author:req.userId});
        await newPost.save()
        res.status(201).send({
            message:"Post created successfully",
            post:newPost
        })
    }catch(error){
        res.status(500).send({message:"Error creating post"})
    }
}



)

router.get("/:id",verifyToken,async(req,res)=>{
    try{
        const postId=req.params.id;
        const post= await BlogModel.findById(postId)
        if(!post){
            return res.status(404).send({message:"Post not found"})
        }

        const coomment=await Comment.find({postId}).populate('user',"username email")
        res.status(200).send({message:"Post retrived successfully",
            post:post
        })

    }catch(error){
        res.status(500).send({message:"Error fetching single post"})
    }
})

router.patch("/update-post/:id",async(req,res)=>{
    try{
        const postId=req.params.id;
        const updatedPost= await BlogModel.findByIdAndUpdate(postId,{
            ...req.body

        },{new:true})

        if(!updatedPost){
            return res.status(404).send({message:"Post not found"})
        }
        res.status(200).send({message:"Post updated successfully",
            post:updatedPost
        })
    }catch(error){
        res.status(500).send({message:"Error creating post"})
    }
})


router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        const postId=req.params.id
        const post =await BlogModel.findByIdAndDelete(postId)
        if(!post){
            return res.status(404).send({message:"Post not found"})
        }

        await Comment.deleteMany({postId:postId})
        res.status(200).send({message:"Post deleted successfully",post:post})

    }catch(error){
        res.status(500).send({message:"Error deleting post"})
    }
})


router.get('/related.:id',verifyToken,async(req,res)=>{
    try{
        const {id} =req.params;
        if(!id){
            return res.status(400).send({message:"Post id is required"})
        }
        const blog =await BlogModel.findById(id)
        if(!blod){
            return res.status(404).send({message:"Post is not found"})
        }

        const titleRegex=new RegExp(blog.title.split(' ').join('|'),'i');
        const relatedQuery={
            _id:{$ne:id},
            title:{$regex:titleRegex}
        }
        const relatedPost=await BlogModel.find(relatedQuery)
        res.status(200).send({message:"Related post found!",post:relatedPost})
    }catch(error){
        res.status(500).send({message:"Error fetching related post"})
    }
})

module.exports=router
