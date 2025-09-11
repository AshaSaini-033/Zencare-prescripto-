import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  
  //make api call
  //get all by context
  const {aToken,appointments,getAllAppointments,cancelAppointmentsByAdmin } = useContext(AdminContext)
  const {calculateAge,currencySymbol}=useContext(AppContext)
  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm overflow-y-scroll max-h-[80vh] min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b gap-3 '>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p  className='sm:px-5'>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
       
      { appointments.map((item, index) => (
  <div className='flex flex-wrap justify-between max-sm-gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100 gap-2' key={index}>
    <p  >{index + 1}</p>
    <div className='flex items-center gap-2'>
      <p>{item.userData && item.userData.name ? item.userData.name : 'N/A'}</p>
        <img className='w-10 rounded-full' src={item.userData && item.userData.image ? item.userData.image :"N/A"}/>
     {/* <img className='w-10 rounded-full' src = {item.userData.image}/><p>{item.userData.name}</p> */}
      </div>
      <p>{item.userData && item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
      <p >{item.slotDate} , {item.slotTime}</p>
      <div className='flex items-center gap-2'>
     <img className='w-10 rounded-full' src = {item.docData.image}/><p className='sm:text-sm'>{item.docData.name}</p>
      </div>
      <p className='sm:px-5'>{currencySymbol}{item.docData && item.docData.fees ? item.docData.fees: 'N/A'}</p>
      {
        item.cancelled ?<p className='text-red-500 sm:text-sm'>Cancelled</p>:< img onClick={()=>cancelAppointmentsByAdmin(item._id)}className=' rounded-full w-50 cursor-pointer hover:bg-blue' src={assets.cancel_icon}/>
      }
      </div>
))}
</div>
      </div>
   
  )
}

export default AllAppointments
