const express=require('express');
const app=express()
const cors=require('cors');
const connectDB=require('./db/db');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');


dotenv.config();

app.use(cors());
connectDB();
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;