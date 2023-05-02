const express=require("express");
const { PostModel } = require("../model/post.Model");


const postRouter=express.Router();

postRouter.post("/create",async(req,res)=>{
try {
    const post = new PostModel(req.body)
   await post.save();
    res.status(200).send({"msg":"New post has been added"})
} catch (error) {
    res.status(400).send({"err":err.message});
}
})

postRouter.get("/",async(req,res)=>{
    const {device}=req.query;
try {
    let query={userID:req.body.userID}
    if(device){
        query.device=device;
    }
    const posts=await PostModel.find(query);
    res.status(200).send(posts)
} catch (error) {
    res.status(400).send({"err":error.message})
}
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID});
    try {
        if(req.body.postID!==post.userID){
            res.status(200).send({"msg":"You are not authorized to perform this action "});
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body);
            res.status(200).send({"msg":`The post with id ${postID} has been updated`});
        }
    } catch (error) {
        res.status(400).send({"err":error.message});
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID});
    try {
        if(req.body.postID!==post.userID){
            res.status(200).send({"msg":"You are not authorized to perform this action "});
        }else{
            await PostModel.findByIdAndDelete({_id:postID},req.body);
            res.status(200).send({"msg":`The post with id ${postID} has been deleted`});
        }
    } catch (error) {
        res.status(400).send({"err":error.message});
    }
})

module.exports={postRouter}