import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const nevigate = useNavigate()
  const logout = () => {
    nevigate('/')
  aToken && setAToken("")
  aToken && localStorage.removeItem('aToken')
  }
   // sab clear hone ke baad redirect

  return (
    <div className='flex justify-between bg-[#F2F3FF] items-center border-b sm:px-10 py-3'>
      <div className='flex justify-between gap-4 '>
        <img className='w-36 cursor-pointer' src ={assets.admin_logo}/>
        <p className='border px-2.5 py-0.5 boder-gray-600 rounded-full text-gray-600'>{aToken?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout}className='bg-primary text-white text-sm rounded-full px-10 py-2'>Log Out</button>
    </div>
  )
}

export default Navbar
