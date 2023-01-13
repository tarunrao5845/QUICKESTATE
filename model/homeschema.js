const mongoose = require('mongoose')


const homeSchema = new mongoose.Schema({
     fname:String,
     lname:String,
    number : String,
    email:String,
    address:String,
    service:String,
    city:String,
    area:String,
  
    
})
const HomeS = mongoose.model("homeservice" , homeSchema)

module.exports= HomeS