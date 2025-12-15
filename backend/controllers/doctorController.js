import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";


   export const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);

        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        
        // We are now updating the correct 'available' field
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        
        res.json({ success: true, message: "Availability Changed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error changing availability" });
    }
};
 export const doctorsList  = async (req,res)=>{
    try{
        const doctors= await doctorModel.find({ available: true }).select(['-password','-email']) 
        res.json({success:true,doctors})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
 }
}

// New function for Admin Panel to get all doctors
export const getAllDoctorsForAdmin = async (req, res) => {
    try {
        // This endpoint is for admins, so we return more data, like email.
        // We still exclude the password for security.
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching doctors for admin" });
    }
};


export const doctorLogin =async(req,res)=>{
    try{
        console.log('BODY:', req.body);
        const {email,password}=req.body
        
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:"Doctor not found"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }else{
            // Create a payload that includes both the ID and the ROLE
            const payload = {
                id: doctor._id,
                role: 'doctor' // Explicitly add the role to the token
            };

            // Sign the token with the new, more complete payload
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({success:true, message: "Login successful", token})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }

}
 //  API TO GET DOCTOR APPOINTMNETS FOR DOCTOR PANEL
export  const appointmentsDoctor = async(req,res)=>{
    try{
        //prev authdoctor m token le rhe h headers se fir uskoo doc id m convert kr rhe h
       const docId= req.doctorId
       const appointments = await appointmentModel.find({docId})
       res.json({success:true,appointments})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
}
//api to mark appt completed for doctor panel
export const appointmentComplete = async(req,res)=>{
    try{
        //doc id from authDoctor middleware change token into doc id and pass appointment id in api
        const {appointmentId }= req.body
          const doctorId = req.doctorId; 
        const appointmentData = await appointmentModel.findById(appointmentId)
        //same doctor login with whom appt boked
     if(appointmentData && String(appointmentData.docId)===String(doctorId)){
       await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
       res.json({success:true,message:"Appointment marked as completed"})
       
}else{
    res.json({success:false,message:"You are not authorized to mark this appointment as completed"})
}

    }
     catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
}
//api to mark appt cancel for doctor panel
export const appointmentCancel = async(req,res)=>{
    try{
        //doc id from authDoctor middleware change token into doc id and pass appointment id in api
        const {appointmentId }= req.body
          const doctorId = req.doctorId; 
        const appointmentData = await appointmentModel.findById(appointmentId)
        //same doctor login with whom appt boked
     if(appointmentData && String(appointmentData.docId)===String(doctorId) ){
       await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
       res.json({success:true,message:"Appointment marked as canceled"})
       
}else{
    res.json({success:false,message:"You are not authorized to mark this appointment as cancel"})
}

    }
     catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
}
//api to get dashboard data for doctor panel 
 export const doctorDashboard  = async(req,res)=>{
try{
    const doctorId = req.doctorId
    const appointments = await appointmentModel.find({docId:doctorId})
   let earnings = 0
   appointments.map((item)=>{
    if(item.isCompleted || item.payment){
          earnings += item.amount
    }
   })
   let patients =[]
   appointments.map((item)=>{
    if(!patients.includes(item.userId)){
        patients.push(item.userId)
    }
   })
   const dashData = {
    earnings,
    appointments:appointments.length,
    patients:patients.length,
   latestAppointments : appointments.reverse().slice(0,5)
   
   }
   res.json({success:true,dashData})
}catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
}
//api to get doctor profile for docto r panel 
export const doctorProfile  = async(req,res)=>{
    try{
        const doctorId = req.doctorId
        const profileData = await doctorModel.findById(doctorId).select('-password')
        res.json({success:true,profileData})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
}
//api to update doctor profile for doctor panel
export const updateProfile  = async(req,res)=>{
    try{
        const doctorId = req.doctorId  
        const {fees,address,available} = req.body
        await doctorModel.findByIdAndUpdate(doctorId,{fees,address,available})
        res.json({success:true,message:"Profile updated successfully"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        }
    }