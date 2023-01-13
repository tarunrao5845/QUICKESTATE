require('dotenv').config();
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const HomeS = require('./model/homeschema')
const HomeDecor = require('./model/homedecorschema')
const Insurance = require('./model/insurance')
const IT = require('./model/itservice')
const CarBooking = require('./model/carbooking')
const VehicleS = require('./model/vehicleService')
const Msg = require('./model/msgSchema')
const User = require('./model/userschema')
const path =require('path')
const authenticate = require('./middleware/authenticate')
app.use(express.json())//this is use to convert json data  to strin in pc
const DB = process.env.DATABASE
mongoose.connect(DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection successfull")}
).catch((err)=>
    console.log("connection failed")
  )


app.use(cookieParser());



app.get('/ServicePage' , authenticate , async(req , res)=>{
    console.log(`Hello Service Page`);
    res.send(req.rootuser);
})
app.get('/Navbar' , authenticate , async(req , res)=>{
    res.send(req.rootuser);
})

app.get("/Logout" , authenticate , (req , res)=>{

    res.clearCookie("jwtoken" , {path:'/'})
   console.log("logout Successfully")
    res.status(500).send("user Logout")
  
})


                      
app.post("/signin",  async(req , res)=>{
    try{
        const { email , password } = req.body;
       if(!email || !password){
           return   res.send({message:"fill details"})
           // res.status(400).json({error:"Plz Fill The Details First"})
       }
        const userLogin = await User.findOne({email:email})
        console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password)
            const token = await userLogin.generateAuthToken();
            console.log(token);

           res.cookie("jwtoken", token , {
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
           })

            if ( !isMatch){
                res.status(404).json({error:"Invalid Credentials"})
                // res.send({message:"error"})
            }else{
                res.send({message:"user Login Successfully"})
            }
        }
        else{
            res.status(404).json({error:"user Error"})
        }
      
    }catch(err){
        console.log(err);
    }

});

app.post("/register", async (req , res)=>{
    const {name , email , password } = req.body;
    if( !name || !email || !password){
        return res.status(422).json({error:"Plz Fill The Details First"})
    }
    res.send(" Register API Is Working")
    try{
        const userExists = await User.findOne({email:email})
        if(userExists){
            return ( console.log('user already registered'))
           }
           const user = new User({
               name,
               email,
               password,
           })
           await user.save();
           console.log("user registered successfully")
        //    res.status(201)({message:"user registered successfully "})
    }catch(err){
        console.log(err);
    }
    })

app.post("/Query", (req , res)=>{
    const {name , email,number , message } = req.body;

    if(!number || !message){
     return  res.send({message:"Enter Your Query First"})}
    res.send("chllu hora h kya")
        const userQuery = new Msg({
            name,
            email,
            number,
            message,
        })
        userQuery.save().then(()=>{
            console.log("Query Registered")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });
app.post("/homeservice", (req , res)=>{
    const {fname ,lname,number, email,address,service ,city,area } = req.body;

    if(!fname || !lname || !number || !email || !address || !service || !city || !area ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const hservice = new HomeS({
            fname ,
            lname,
            number, 
            email,
            address,
            service,
            city,
            area,
        })
        hservice.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });
app.post("/HomeDecor", (req , res)=>{
    const {fname ,lname,service,number, email,address ,city,area } = req.body;

    if(!fname || !lname || !number || !email || !address || !service || !city || !area ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const homedecor = new HomeDecor({
            fname ,
            lname,
            service,
            number, 
            email,
            address,
            city,
            area,
        })
        homedecor.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });
app.post("/Insurance", (req , res)=>{
    const {name,number,RCnumber,Vname,Vnumber,Varient,city, } = req.body;

    if(!name || !number || !RCnumber || !Vname || !Varient || !city ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const insurance = new Insurance({
            name,number,RCnumber,Vname,Vnumber,Varient,city,
        })
        insurance.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });
    
app.post("/ITservices", (req , res)=>{
    const {name,Phonenumber,email,projectinfo } = req.body;

    if(!name || !Phonenumber || !email || !projectinfo ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const itservices = new IT({
            name,Phonenumber,email,projectinfo
        })
        itservices.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });


app.post("/Carbooking", (req , res)=>{
    const {fname,lname,Phonenumber,email,PickingAddress,DropAddress,From,City,CarType} = req.body;

    if( !fname || !lname || !Phonenumber || !email || !PickingAddress || !DropAddress || !From || !City || !CarType ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const booking = new CarBooking({
            fname,lname,Phonenumber,email,PickingAddress,DropAddress,From,City,CarType
        })
        booking.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });


app.post("/VehicleService", (req , res)=>{
    const {fname,lname,Phonenumber,email,PickingAddress, date , service,City,} = req.body;

if( !fname || !lname || !Phonenumber || !email || !PickingAddress || !date || !service || !City ){
     return  res.send({message:"Enter Your Details"})}
    res.send("chlra h kya")
        const vehicle = new VehicleS({
            fname,lname,Phonenumber,email,PickingAddress ,date,service,City
        })
     vehicle.save().then(()=>{
            console.log("Form Details Sent")
        //    res.status(201)({message:"user registered "})
        //    .catch((err)=>res.status(500).json({err:"failed to registered"}))
        })
    });

    app.use(express.static(path.join(__dirname , './my-app/build')))
    app.get('*' , function(req , res){
        res.sendFile(path.join(__dirname , './my-app/build/index.html'))
    })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
