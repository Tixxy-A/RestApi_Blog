const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
//const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const helmet=require('helmet');
const morgan=require('morgan');
const userRoutes=require('./route/user')
const authRoutes=require('./route/auth')
const postRoutes=require('./route/post')
const app = express();

app.use(express.json());

mongoose.connect(process.env.mongoA);
app.use(helmet());
app.use(morgan("common"));

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.listen(3000,()=>{
    console.log("running");
})