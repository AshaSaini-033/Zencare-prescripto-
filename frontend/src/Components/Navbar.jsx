import React, { useContext, useState } from 'react'
import { assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
    const nevigate = useNavigate();
    const [showMenu,setShowMenu]= useState(false)
   //get token byy constext
   const {token,setToken,userData} = useContext(AppContext)
   const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
   }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400' >
        <img className='w-44 cursor-pointer'onClick={()=>{nevigate('/');scrollTo(0,0)

        }} src={assets.logo} alt='' />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
           <li className='py-1'>HOME</li>
           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/doctors'>
           <li className='py-1'>ALL DOCTORS</li>
           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/about'>
           <li className='py-1'>ABOUT</li>
           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
         <NavLink to='/contact'>
           <li className='py-1'>CONTACT</li>
           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
            token && userData
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-10 rounded-full' src={userData.image} alt=''/>
                <img className='w-2.5'src ={assets.dropdown_icon} alt=''/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick ={()=>nevigate('/my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
                         <p onClick ={()=>nevigate('/my-appointments')}className='hover:text-black cursor-pointer'>My Appointment</p>
                          <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>:
           <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block' onClick={()=>nevigate('/login')}>CREATE ACCOUNT</button>
            }
           {/* Menu Button */}
<img
  onClick={() => setShowMenu(true)}
  className="w-6 md:hidden cursor-pointer"
  src={assets.menu_icon}
  alt="menu"
/>

{/* Mobile Menu */}
<div
  className={`fixed inset-0 bg-white z-50 transition-transform duration-300 md:hidden
  ${showMenu ? "translate-x-0" : "translate-x-full"}`}
>
  {/* Header: Logo + Close */}
  <div className="flex items-center justify-between px-5 py-6 border-b">
    <img className="w-36" src={assets.logo} alt="logo" />
    <img
      className="w-7 cursor-pointer"
      onClick={() => setShowMenu(false)}
      src={assets.cross_icon}
      alt="cross"
    />
  </div>

  {/* Nav Links */}
  <ul className="flex flex-col items-center font-medium gap-6 mt-8">
    <NavLink className='hover:bg-primary border border-full rounded text-xl' to="/" onClick={() => setShowMenu(false)}>HOME</NavLink>
    <NavLink  className='hover:bg-primary border border-full rounded text-xl' to="/doctors" onClick={() => setShowMenu(false)}>ALL DOCTORS</NavLink>
    <NavLink className='hover:bg-primary border border-full rounded text-xl' to="/about" onClick={() => setShowMenu(false)}>ABOUT</NavLink>
    <NavLink className='hover:bg-primary border border-full rounded text-xl' to="/contact" onClick={() => setShowMenu(false)}>CONTACT US</NavLink>
  </ul>
</div>

        </div>
    </div>
  )
}

export default Navbar
