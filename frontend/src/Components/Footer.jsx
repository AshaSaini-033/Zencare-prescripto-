import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
    <div className='flex flex-row gap-20 mx-10 my-10 text-sm'>
     {/* left */}
     <div>
         <div>
            <img className='mb-5 w-40' src = {assets.logo}/>
              </div>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>© 2025 HealthConnect. We believe good health begins with easy access to the right doctors. 
That’s why we bring you a platform where you can search, compare, and book appointments with 100+ trusted specialists anytime, anywhere.
</p>
       
     </div>
     {/* mid */}
     <div>
      <h1 className='text-xl font-medium mb-5'>Company</h1>
     <ul className='flex flex-col gap-2 text-gray-600'>
        <li>
            <Link to='/'>Home
            </Link></li>
        <li>
            <Link to='/about'>About Us
            </Link></li>
        <li>
            <Link to='/contact' onClick={scrollTo(0,0)}>Contact Us 
            </Link></li>
        <li>Privacy Policy</li>
     </ul>
     </div>
     {/* right */}
     <div>
      <h1 className='text-xl font-medium mb-5'>Get In Touch</h1>
      <ul className='fleex flex-col gap-3 text-gray-600'>
        <li >8977899999</li>
        <li>ashasaini@gmail.com</li>
      </ul>
     </div>
     {/* copyRight section */}
    
    </div>
    <hr className='bg-black'></hr>
     <p className='py-5 text-sm text-center'>CopyRight @2025 Asha's ZenCare app.All Rights are Reserved</p>
     </div>
  )
}

export default Footer
