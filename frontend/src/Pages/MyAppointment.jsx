import React, { useContext, useEffect, useState } from 'react'
import  { AppContext } from "../Context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
const MyAppointment = () => {
  const {backendUrl ,token} = useContext(AppContext) 
  const [appointments,setAppointments] = useState([])
const getUserAppointments = async()=>{
  try{
    const {data}= await axios.get(backendUrl+'/api/user/appointments/',{
      headers:{token}
    })
    if(data.success){
      setAppointments(data.appointments.reverse())
      console.log(data.appointments.reverse())
    }else{
      toast.error(data.message)
    }
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
}
const cancelAppointment = async(appointmentId)=>{
  try{
   // console.log(appointmentId)
   const {data }=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
   if(data.success){
    toast.success(data.message)
    getUserAppointments()
   }else{
    toast.error(data.message)
   }
  
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
}
useEffect(()=>{
  
  getUserAppointments()

},[token])
  return (
    <div>
      <p className='text-xl text-gray-600 pb-3 mt-12 border-b'>My Appointments</p>
      <div>
       
        {appointments.map((items,index)=>(
          
         <div key = {index} className='grid grid-cols-[1fr_4fr_auto] gap-3 py-2 border-b items-start '>
            
          <div  className='max-w-65 bg-indigo-50'><img src = {items.docData.image}/></div>
       
          <div className='mt-5'>
            <p className='text-black text-xl font-medium'>{items.docData.name}</p>
            <p>{items.docData.speciality}</p>
            <p className='text-gray-600 text-xl font-medium mt-5'>Address:</p>
            <p className='text-s text-gray-600'>{items.docData.address}</p>
            
            <p className='mt-5'><b className='font-medium m'>Date & Time :</b> <span>{items.slotDate} | {items.slotTime}</span></p>
            </div>
            {/* <div></div> */}
            <div className='flex flex-col gap-2 justify-end items-end  mt-40 '>
             {!items.cancelled && <button className='hover:bg-primary gap-2 sm:min-w-48 py-2  border rounded'>Pay Online</button>} 
              {!items.cancelled && <button onClick={()=>cancelAppointment(items._id)}className='hover:bg-primary gap-2 sm:min-w-48 py-2 border rounded'>Cancel Appointments</button>
  }   
  {items.cancelled && <button className='border border-gray-600 text-lg  text-red-500 rounded'>Appointment Cancelled</button>}        </div>
         </div>)
        )
      }
      </div>
    </div>
  )
}

export default MyAppointment
