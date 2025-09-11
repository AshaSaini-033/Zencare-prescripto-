import React from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const Dashboard = () => {
  const {aToken,getDashData,dashData,cancelAppointmentsByAdmin}=useContext(AdminContext)
  useEffect(()=>{
    if(aToken){
      getDashData()
    }
  },[aToken])
  return dashData &&  (
    <div className='m-5 '>
       <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded  sm:min-w-60 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className="w-14"src = {assets.doctor_icon}alt = ""/>
         <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.doctor}</p>
              <p className='text-gray-400'>Doctors</p>
         </div>
       </div>
       <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded  sm:min-w-60 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className="w-14"src = {assets.appointment_icon}alt = ""/>
         <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.appointment}</p>
              <p className='text-gray-400'>Appointments</p>
         </div>
       </div>
       <div className='flex items-center gap-2 bg-white p-4 min-w-52 sm:min-w-60 rounded  border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className="w-14" src = {assets.patients_icon}alt = ""/>
         <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.user}</p>
              <p className='text-gray-400'>Patient</p>
         </div>
       </div>
       </div>
       < div className='bg-white '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src = {assets.list_icon}/>
          <p className='font-semibold'>Latest Booking</p>
        </div>
          <div className='pt-4 border border-t-0'>
            {
              dashData.latestAppointment.map((item,index)=>(
                <div className='flex items-center px-6 py-3 gap-3' key={index}>
                  <img className='rounded-full w-10' src={item.docData.image} alt  =""/>
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                    <p className='text-gray-800'>{item.slotDate}</p>
                  </div>
                    {
                            item.cancelled ?<p className='text-red-500 sm:text-sm'>Cancelled</p>:< img onClick={()=>cancelAppointmentsByAdmin(item._id)}className=' rounded-full w-50 cursor-pointer hover:bg-blue' src={assets.cancel_icon}/>
                    }
                </div>

              )
            )
            }

          </div>
        
       </div>
      </div>
  
  )
}

export default Dashboard
