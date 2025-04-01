const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const port=process.env.port || 5000


app.use(express.json())
app.use(cors())

const blogRoutes=require("./src/routes/blogRoute.js")
const CommentRoute=require("./src/routes/CommentRoute.js")
const authRoute=require("./src/routes/authRoute.js")




app.use('/api/auth',authRoute)
app.use('/api/blogs',blogRoutes)
app.use('/api/comments',CommentRoute)

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    app.get('/',(req,res)=>{
        res.send("Hello World");
    })
}

// kummararajasekhar17092004
// svyeeCnv53UJwI2H
main().then(()=>console.log("Mongodb connected successfully")).catch(err=> console.log(err));


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})