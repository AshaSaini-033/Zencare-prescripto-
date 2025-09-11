import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'; // It's highly recommended to hash passwords
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create token with admin identity
    const token = jwt.sign(
      { id: "admin", email: process.env.ADMIN_EMAIL }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ success: true, atoken: token });
  } catch (error) {
    console.log("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};
export const addDoctor = async (req, res) => {
    try {
        const image_filename = req.file.filename;
        const address = JSON.parse(req.body.address);

        // In a real app, hash the password before saving!
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newDoctor = new doctorModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // Should be hashedPassword
            image: image_filename,
            experience: req.body.experience,
            speciality: req.body.speciality,
            degree: req.body.degree,
            fees: req.body.fees,
            about: req.body.about,
            address: address,
            // Uses correct spelling 'available' from the form
            available: req.body.available === 'true'
        });

        const doctor = await newDoctor.save();
        res.json({ success: true, message: "Doctor added successfully!", data: doctor });

    } catch (error) {
        console.error("Add Doctor Error:", error);
        res.status(500).json({ success: false, message: "Failed to add doctor." });
    }
};

export const allDoctors=async(req,res)=>{
    try{
    const doctors = await doctorModel.find({}).select('-password')
res.json({success:true,doctors})
    }
    catch(error){
  console.log(error)
  res.json({success:false,message:error.message})
    }
}
//API TO GET ALL APPPOINTMENTS LIST 
export const appointmentAdmin=async(req,res)=>{
  try{
    const appointments = await appointmentModel.find({}) ||[]
    //console.log(appointments)
    res.json({success:true,appointments})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
//API FOR APPOINTMENT CANCEL
export const cancelAppointmentsByAdmin = async(req,res)=>
{
   try{
    //const userId = req.userId
    //console.log(userId)
    const {appointmentId}=req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    //verify appt user
    // if(String(appointmentData.userId)!== String(userId))
    //   {
    //     return res.json({success:false,message:"You are not authorized to cancel this appointment"})
      
    //   }
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
export const adminDashboard =async(req,res)=>{
  try{
    const doctors = await doctorModel.find({})
    const appointments = await appointmentModel.find({})
    const users = await userModel.find({})
    const dashData={
      doctor:doctors.length,
      appointment:appointments.length,
      user:users.length,
      latestAppointment:appointments.reverse(),
    }
    res.json({success:true,dashData})


  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  
  }
}