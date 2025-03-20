
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY

const verifyToken=async(req,resizeBy,next)=>{
    try{
        const token =req.cookies.token;
        const token2=req.headers

        if(!token){
            return res.status(401).send({message:"No token provided"})

        }
        const decoded=jwt.verify(token,JWT_SECRET_KEY)
        if(!decoded.userId){
            return res.status(401).send({message:"Invalid token provided"})
        }
        req.userId=decoded.userId
        req.role=decoded.role
        next();
    }catch(error){
        res.status(401).send({message:"Invalid token"})
    }
}

module.exports=verifyToken