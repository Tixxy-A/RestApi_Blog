const express=require('express');
const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    },
    img:{
        type:String
    }
});

module.exports=mongoose.model('post',postschema);