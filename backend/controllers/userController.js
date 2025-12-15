
// import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
// //import {v2 as cloudinary} from '../config/cloudinary.js'
// import {v2 as cloudinary} from 'cloudinary'
import cloudinary from "../config/cloudinary.js" // make sure you have cloudinary configured
import userModel from "../models/userModel.js"
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
//import razorpay from 'razorpay'



export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { name, phone, address, dob, gender} = req.body
    const imageFile = req.file
     console.log(req.body, req.file)
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all the fields" })
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, dob, gender,address: JSON.stringify(address) },// store as string},
      { new: true }
    )

    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      })
      const imageUrl = uploadResult.secure_url
     await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile updated successfully", user: updatedUser })
  } catch (error) {
    console.log("Update profile error:", error)
    res.json({ success: false, message: error.message })
  }
}


 export const registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name ||!email ||!password){
            res.json({success:false,message:"Please fill all the fields"})
        
        }
        //validating email and pass
     if(!validator.isEmail(email)){
        res.json({success:false,message:"Please enter a valid email"})

     }
     if(password.length<8){
        res.json({success:false,message:"Password must be at least 8 characters long"})
     }
     //check user with same email exist already
     const userExist = await userModel.findOne({email})
     if(userExist){
        res.json({success:false,message:"User already exist"})
     }
     //add in db 
     //hasing user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userData={
    name,
    email,
    password:hashedPassword,
    role: 'user' // Explicitly set the role for a new user

  }
  const newUser = new userModel(userData)
    const user = await newUser.save()
//create token
const payload = {
    id: user._id,
    role: user.role // Add the role to the token payload
};
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
res.json({success:true,user,token})
    }catch(error){
console.log(error)
res.json({success:false,message:error.message})
    }
}
export const loginUser= async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await userModel.findOne({email})
        if(!user){
            res.json({success:false,message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.json({success:false,message:"Invalid credentials"})
        }   
        else{
            const payload = {
                id: user._id,
                role: user.role // Add the role to the token payload
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            
            res.json({success:true, message: "Login successful", token})

        }
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//api to get user profile data
 export const getProfile = async(req,res)=>{
    try{
        //user will send yoken by this token we will get user id and add in req.body
        //to change header into userid create middleware
        const userId =req.userId
        console.log("userId from token:", userId);
 const userData = await userModel.findById(userId).select('-password').lean()
//console.log("Found user:", userdata);
        res.json({success:true,userData})

    }catch(error){
          console.log(error)
        res.json({success:false,message:error.message})
    }
}
//Api to book appontments
export const bookAppointment = async (req, res) => {
    try {
        const {userId,docId,slotDate,slotTime}=req.body
        const docData= await doctorModel.findById(docId).select('-password').lean()
         console.log(docData)
         if(!docData.available){
            return res.json({success:false,message:"Doctor is not available"})
         }
        let slot_booked = docData.slot_booked || {};

        //checking for slot booked
        if(slot_booked[slotDate]){
             if(slot_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot already booked"})

             }else{
                slot_booked[slotDate].push(slotTime)
             }
        }else{
            slot_booked[slotDate]=[]
            slot_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password').lean()
        delete docData.slot_booked
        const appointmentData={
            userId,
            docId,
           slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date:new Date(),
            slotTime,
            
        }
        //save appyment in db
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        //save new slot data
        await doctorModel.findByIdAndUpdate(docId,{slot_booked})
        res.json({success:true,message:"Appointment booked successfully"}) 
        
    }catch(error){
          console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to get user appointments for frontend my appt page
// auth middleware
// const verifyToken = (req, res, next) => {
//   const token = req.headers.token;
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach user info to req.user
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const listAppointments = async (req, res) => {
    try {
        const userId=req.userId
        console.log(userId)
        const appointments= await appointmentModel.find({userId}).lean()
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export const cancelAppointments = async(req,res)=>
{
   try{
    const userId = req.userId
    console.log(userId)
    const {appointmentId}=req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    //verify appt user
    if(String(appointmentData.userId)!== String(userId))
      {
        return res.json({success:false,message:"You are not authorized to cancel this appointment"})
      
      }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true })
        //releasing doctor slot
        const {docId,slotDate,slotTime}=appointmentData
        console.log(docId,slotDate,slotTime)
        const doctorData  =  await doctorModel.findById(docId)
        let slot_booked = doctorData.slot_booked || {};
        slot_booked[slotDate]=slot_booked[slotDate].filter(time=>time!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slot_booked})
        res.json({success:true,message:"Appointment cancelled successfully"})
   }catch(error)
   {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}
//razor pay instance 
// //key id and secret by razor payy website
// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const paymentRazorpay = async(req,res)=>{

// }