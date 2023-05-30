const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const secretkey='ain6'
 
const signup = async(req,res)=>{
    let {name , email , password} = req.body
    try {
        if(!name){
            return res.status(500).send({
                success:false,
                message:"Name is required"
            })
        }
        if(!email){
            return res.status(500).send({
                success:false,
                message:"Email is required"
            })
        }
        const existingUser = await user.findOne({ email })
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:"Already register please login"
            })
        }
        let hashpassword = await bcrypt.hash(password,10)
        let users=await user.insertMany({ name : name , email : email , password : hashpassword})
        return res.status(200).send({
            success:true,
            message:"Register Sucessfully",
            users
        })
        
    } catch (error) {
        console.log(`userController-->signup--> ${error}`)
        return res.status(500).json({ "message": error })
    }
}

const login = async(req,res)=>{
    let {email , password}= req.body
    try {
        let userss = await user.findOne({ email: email })
        console.log(userss)
        if (!userss) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            })
        }
        let match =await bcrypt.compare(password , userss.password)
        if (!match){
            return res.send(404).send({
                success:false,
                message:" Invalid Details "
            })

        }
        //token
        const token= await jwt.sign({_id:userss._id},secretkey)
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: userss._id,
                name: userss.name,
                email: userss.email
            },
            token,
        })
        
    } catch (error) {
        console.log(`userController-->login--> ${error}`)
        return res.status(500).json({ "message": error })
        
    }
}
module.exports={signup,login}
