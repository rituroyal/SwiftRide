const express=require('express');
const app=express()
const cors=require('cors');
const connectDB=require('./db/db');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const otpRoutes = require('./routes/otp.routes');

// dotenv.config();

app.use(cors({
  // origin: '*',  
  // origin: '*',
  //   credentials: true   
  origin: 'http://localhost:5173',
  credentials: true
  }));
  
connectDB();
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/auth', otpRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;