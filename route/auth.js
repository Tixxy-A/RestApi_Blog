const express=require('express');
const bcrypt=require('bcrypt');
const User=require('../modals/usser')
const router=express.Router();

router.get('/',async (req,res)=>{
    const all_user=await User.find({});
    res.json(all_user);

})
router.post('/register',async (req,res)=>{
    const password=req.body.password;
    let hashedPassword;
    try{
        //const salt=await bcrypt.genSalt(10);
         hashedPassword=await bcrypt.hash(password,10);
        //console.log("pass hashed")
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        const user=await newUser.save();
        res.status(200).json(user);

    }catch(er){
        console.log(er);
    }
})

router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    let existing_user;
    try{
        existing_user=await User.findOne({email:email});
    }catch(e){
        console.log(e);
    }
    if(!existing_user ) return res.status(404).json("no data found");
    let validpass=false;
    try{
        validpass=await bcrypt.compare(password,existing_user.password);
    }catch(e){
        console.log(e);
    }
    if(!validpass) return res.status(401).json("incorrect information");
    res.json(existing_user);
})

module.exports=router;