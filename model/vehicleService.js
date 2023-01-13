const mongoose = require('mongoose')


const VehicleSchema = new mongoose.Schema({
     fname : String,
     lname : String,
    Phonenumber : String,
    email : String,
    PickingAddress : String,
    date : String,
    service : String,
    City : String,
})
const VehicleS = mongoose.model("vehicleservice" , VehicleSchema)

module.exports= VehicleS