const mongoose = require('mongoose')


const homedecorSchema = new mongoose.Schema({
     fname:String,
     lname:String,
    number : String,
    email:String,
    address:String,
    service:String,
    city:String,
    area:String,
  
    
})
const HomeDecor = mongoose.model("Decorservice" , homedecorSchema)

module.exports= HomeDecor