const mongoose = require ('mongoose')

const bookingSchema = new mongoose.Schema({
    email:String,
    password:String,
    firstname:String,
    gender:String,
    secondname:String,
    phonenumber:String,
    checkindate:String,
    checkoutdate:String,
    sharingtype:String,
    withFood:String,
    price:String,
    role:{type:String, default:'visitor'},
    bookingDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Occupants' }], 
},{
timestamps:true
})
const BookingModel=mongoose.model('Bookings',bookingSchema)
module.exports = BookingModel