

const express=require("express")
const User = require("../model/UserModel")
const router=express.Router()
const bcrypt=require('bcrypt')
const generateToken =require('../middleware/generateToken')

router.post('/register',async(req,res)=>{
    try{
        const {email,password,username}=req.body
        const user=await User({email,password,username})
        await user.save()
        res.status(200).send({message:"User registered successfully",user})


    }catch(error){
        res.status(500).json({message:"Registration failed"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        const isMatch=await user.comparedPassword(password)
        if(!isMatch){
            return res.status(401).send({message:"Invalid password"})
        }
        const token=await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:true
        })
        res.status(200).send({message:"Login successfull!",token,user:{
            _id:user._id,
            email:user.email,
            username:user.username,
            role:user.role
        }})
    }catch(error){
        res.status(500).send({message:"Login failed try again"})
    }
})

router.pist('/logout',async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).send({meesage:"Logged out successfully"})

    }catch(error){
        res.status(500).json({message:"logout failed"})
    }
})

router.get('/users',async(req,res)=>{
    try{
        const uesrs =await User.find({},'id email role')
        res.status(200).send({message:"User found successfully",users})

    }catch{
        res.status(500).json({message:"Failed to fetch users"})
    }
})

router.delete('users/:id',async(req,res)=>{
    try{

        const {id}=req.params
        const user=await User.findByIdAndUpdate(id)
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send({message:"Users deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Error deleting"})
    }

})

router.put('users/:id',async(req,res)=>{
    try{
        const {id}=req.body;
        const {role}=req.body;
        const user=await User.findByIdAndUpdate(id,{role},{new:true})
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send({message:"User role updated successfully",user})
    }
    catch(error){
        res.status(500).json({message:"Error deleting"})
    }
})

module.exports=router