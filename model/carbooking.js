const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
     fname : String,
     lname : String,
    Phonenumber : String,
    email : String,
    PickingAddress : String,
    DropAddress : String,
    From : String,
    City : String,
    CarType : String,
  
    
})
const CarBooking = mongoose.model("carbooking" , bookingSchema)

module.exports= CarBooking