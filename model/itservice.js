const mongoose = require('mongoose')


const itservice = new mongoose.Schema({
     name:String,
    Phonenumber : String,
    email : String,
    projectinfo:String,
})
const IT = mongoose.model("itservices" , itservice)

module.exports= IT