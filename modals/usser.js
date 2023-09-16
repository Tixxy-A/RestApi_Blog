const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20
    },
    email:{
        type:String,
        required:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:4,
    },
    profilePhoto:{
        type:String,
        default:''
    },
    coverPhoto:{
        type:String,
        default:''
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}
//,{timestamps:true}
);

module.exports=mongoose.model('Customer',userSchema);