const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

const posts=[
    {name:'Anuj', sex:'Always'},
    {name:'Anuj_real', sex:'Horny'}
]

app.get('/post',authenticatetoken,(req,res)=>{
    if(req.user==="jwalaaa")  res.send({name:req.user});
    else res.send('not found');
})

app.post('/login',(req,res)=>{
    const username=req.body.name;
    const token=jwt.sign({name:username},process.env.secret);
    res.json({key:token});
})

function authenticatetoken(req,res,next){
    try{
        const extracted_token=req.headers['authorization'].split(' ')[1];
        if(!extracted_token) return res.send('failed no token found');
        const decoded=jwt.verify(extracted_token,process.env.secret);
        req.user=decoded.name;
        next();
    }catch(e){
        throw res.send('failed u are unauthorized');
    }
} 

app.listen(3000,()=>{
    console.log("running");
})