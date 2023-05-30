const express = require('express')
const connection= require('./connection/db')
const userRouter = require('./routes/userRoute')
const cors=require('cors')
const path =require('path')

const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))

app.use(express.static(path.join(__dirname,'./build')))

app.use('*',function(req,res){
    res.sendFile(path.json(__dirname,'./build/index.html'))
})

app.use('/',userRouter)
app.listen(8000,()=>{
    console.log("server started on port 8000")
    connection()
})