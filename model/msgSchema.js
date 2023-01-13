const mongoose = require('mongoose')


const msgSchema = new mongoose.Schema({
    name:String,
    email:String,
    number : String,
    message : String,
})
const Msg = mongoose.model("Queries" , msgSchema)

module.exports= Msg