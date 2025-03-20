

const mongoose=require('mongoose')

const bcrypt=require('bcrypt')
const UserSchema=new mongoose.Schema({
    
    username:{
        type:String,
        requied:true,
        unique:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password'))
        return next();

    const hashedPassword=await bcrypt.hash(user.password,10)
    user.password=hashedPassword
    next();
})

UserSchema.methods.comparedPassword=function(givenPassword){
    return bcrypt.compare(givenPassword,this.password)
}



const User= mongoose.model("User",UserSchema)
module.exports= User