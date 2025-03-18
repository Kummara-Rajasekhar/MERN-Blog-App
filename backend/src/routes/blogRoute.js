const express=require('express')
const { default: BlogModel } = require('../model/blogModel')
const router=express.Router()


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

        const post= await BlogModel.find(query).sort({createdAt:-1});
        res.status(200).send({
            message:"All Posts retrived successfully",
            posts:post
        })
    }catch(error){
        res.status(500).send({message:"Error creating post"})
    }
})
router.post("/create-post",async()=>{
    try{
        const newPost=new BlogModel({...req.bosy});
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

router.get("/:id",async(req,res)=>{
    try{
        const postId=req.params.id;
        const post= await BlogModel.findById(postId)
        if(!post){
            return res.status(404).send({message:"Post not found"})
        }
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


router.delete("/:id",async(req,res)=>{
    
})

module.exports=router
