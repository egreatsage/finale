const express = require ('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const BookingModel = require('./models/Booking')
const bcryptSalt = bcrypt.genSaltSync(10)
const BookingDetails = require('./models/Booking')
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST'],
    credentials:true
}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)

const verifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json('token is missing')
    }else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.json('token is invalid')
            }else{
                if(decoded.role === 'admin'){
                    next()
                }else{
                    return res.json('you are not authorized')
                }
            }
            
        })
    }
}
app.get('/dashboard',verifyUser,(req,res)=>{
    res.json('ok')
})
app.post('/booking', async (req, res) => {
  const {email, password,firstname,secondname,gender,phonenumber,
  checkindate,checkoutdate,sharingtype,withFood,price } = req.body;
  try {
    const existingUser = await BookingModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json(error);
    }
    const newPassword = await bcrypt.hash(password, 10);
    await BookingModel.create({
      email,
      password: newPassword,
      firstname,
      secondname,
      gender,
      phonenumber,
      checkindate,
      checkoutdate,
      sharingtype,
      withFood,
      price  
    });
    
    res.json({ status: 'ok' });
  } catch (error) {

    res.status(500).json(error);
  }
});

app.post('/login',(req, res) => {
    const { email, password } = req.body;
    BookingModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
              const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET , {
                expiresIn: '1d',
              });
              res.cookie('token', token);
              res.json({ status: 'ok' ,role:user.role});
            } else {
              res.status(401).json('passwords do not match');
            }
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: 'Internal Server Error' });
      });
});
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'ok' });
});

app.post('/addbooking', verifyUser, async (req, res) => {
  try {
    const { checkindate, checkoutdate, sharingtype, price, withFood } = req.body;

    // Get the user's ID from the decoded token
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.email;

    // Create a new booking details entry
    const bookingDetails = await BookingDetails.create({
      user: userId,
      checkindate,
      checkoutdate,
      sharingtype,
      price,
      withFood,
    });
    const user = await BookingModel.findOne({ email: userId });
    user.bookingDetails.push(bookingDetails._id);
    await user.save();

    res.json({ status: 'ok', bookingDetails });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(5000,()=>{
    console.log('Everything running fine')
})