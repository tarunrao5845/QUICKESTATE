const mongoose = require('mongoose')


const insurance = new mongoose.Schema({
     name:String,
    number : String,
    RCnumber : String,
    Vnumber:String,
    Vname:String,
    Varient:String,
    city:String,
})
const Insurance = mongoose.model("insurance" , insurance)

module.exports= Insurance