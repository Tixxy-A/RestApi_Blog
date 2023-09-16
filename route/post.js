const express=require('express');
const Post=require('../modals/post')
const router=express.Router();

router.post('/',async(req,res)=>{
    const newpost=new Post(req.body);
    let ress;
    try{
         await newpost.save();
    }
    catch(e){
        console.log(e);
    }
    res.status(200).json(ress);
}) 

router.put('/:id',async(req,res)=>{
    try{
        const postt=await Post.findById(req.params.id);
        if(req.body.userId===postt.userId){
            const updatedd=await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.json(postt);
        }else{
            res.status(400).json("can't update post");
        }
    }catch(e){
        console.log(e);
    }
})

router.get('/all',async(req,res)=>{
    let alluser;
    try{
         alluser=await Post.find({});
    }catch(e){
        console.log(e);
    }
    res.status(200).json(alluser);
})

router.delete('/:id',async(req,res)=>{
    try{
        const pst=await Post.findById(req.params.id);
        let del;
             del=await Post.findByIdAndDelete(req.params.id);
             res.json(del);
    }catch(e){
        console.log(e);
    }
})

module.exports=router;