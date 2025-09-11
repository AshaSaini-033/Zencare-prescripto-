import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../Context/DoctorContext';

const Sidebar = () => {
  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)
 
  return (
    
    <div className='flex h-screen  md:min-w-72 p-4'>
      {aToken && <ul>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4':" "}`} to={'/admin-dashboard'}>
          <img src = {assets.home_icon}/>
          <p>DashBoard</p>
        </NavLink >
         <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4 ':" "}`}  to={'/all-appointments'}>
          <img src = {assets.appointment_icon}/>
          <p>Appointments</p>
        </NavLink>
         <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4 ':" "}`} to={'/add-doctors' }>
          <img src = {assets.add_icon}/>
          <p>Add Doctors</p>
        </NavLink>
         <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4 ':" "}`}  to={'/all-doctors'}>
          <img src = {assets.people_icon}/>
          <p>Doctors List</p>
        </NavLink>
      </ul>
}
{dToken && <ul>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3  md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4':" "}`} to={'/doctor-dashboard'}>
          <img src = {assets.home_icon}/>
          <p className='hidden md:block'>DashBoard</p>
        </NavLink >
         <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4 ':" "}`}  to={'/doctor-appointments'}>
          <img src = {assets.appointment_icon}/>
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
         <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F9F3FF] border-primary border-r-4 ':" "}`} to={'/doctor-profile' }>
          <img src = {assets.add_icon}/>
          <p className='hidden md:block'>Profile</p>
        </NavLink>
        
      </ul>
}
    </div>
   
  )
}

export default Sidebar
