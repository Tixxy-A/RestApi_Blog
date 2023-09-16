const express=require('express');
const bcrypt=require('bcrypt');
const User=require('../modals/usser');
const router=express.Router();

router.put('/:id',async (req,res)=>{
    if(req.body.id===req.params.id){
        if(req.body.password){
            try{
                let salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }catch(e){
                console.log(e);
            }
        }
        try{
            let updated=await User.findByIdAndUpdate(req.body.id, {$set: req.body,});
        }catch(e){
            console.log(e);
        }
        res.status(200).json("account have been updated");
    }else{
        res.status(404).json("you can't change other's details");
    }
});

router.delete('/:id',async(req,res)=>{
    if(req.body.id===req.params.id){
        try{
            let deleted=await User.findByIdAndDelete(req.body.id);
        }catch(e){
            console.log(e);
        }
        res.status(200).json("account deleted");
    }else{
        res.status(404).json("u can't delete other's account");
    }
})

router.get('/:id',async (req,res)=>{
    let userr;
    try{
        userr=await User.findById(req.params.id);
    }catch(e){
        console.log(e);
    }
    res.status(200).json(userr);
});

router.put('/:id/follow',async(req,res)=>{
    if(req.body.id!==req.params.id){
        let curr_user,user;
        try{
            curr_user=await User.findById(req.body.id);
            user=await User.findById(req.params.id);
        }catch(e){
            console.log(e);
        }
        if(!user.followers.includes(req.body.id)){
            try{
                await user.updateOne({$push:{followers:req.body.id}});
                await curr_user.updateOne({$push:{following:req.params.id}});
            }catch(e){
                console.log(e);
            }
            res.status(200).json("you follow this account");
        }else{
            res.status(404).json("already following this account");
        }
    }else{
        res.status(400).json("u can't follow your own account");
    }
})

module.exports=router;