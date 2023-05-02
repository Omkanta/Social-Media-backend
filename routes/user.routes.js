const express=require("express");
const { UserModel } = require("../model/user.Model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password, 5, (err, hash) =>{
            const user = new UserModel({name,email,gender,password:hash});
            user.save();
            res.status(200).send({"msg":"New User has been registered"});
        });

    } catch (error) {
        res.status(400).send({"err":error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            const result=bcrypt.compare(password, user.password, (err, result)=> {
             if(result){
                const token = jwt.sign({ userID:user._id,username:user.name }, process.env.secretKey);
                res.status(200).send({"msg":"Login Successfull!!","token":token});
             }else{
                res.status(200).send({"msg":"Wrong Credentials"});
             }
            });
        }else{
            res.status(200).send({"msg":"Wrong Credentials"});
        }
    } catch (error) {
        res.status(400).send({"err":error.message});
    }
})

module.exports={userRouter}