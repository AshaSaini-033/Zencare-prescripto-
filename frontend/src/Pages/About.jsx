import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div>
        <p className='text-center my-7 text-2xl'>ABOUT <span><b>US</b></span></p>
      </div>
      <div className='flex flex-row gap-4 text-gray-600 '>
        <img  className="w-full  md:max-w-[360px]"src = {assets.about_image}/>
        <div className='flex flex-col text-sm gap-4 justify-center md:w-2/4 text-gray-600'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
</p>
<p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
<b className='text-gray-800'>Our Vision</b>

<p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>

      </div>
     <div className='text-xl py-4 text-gray-600 '>
      <p>Why Choose<b> US</b></p>
      </div>
     <div className='flex flex-row'>
      <div className='flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:text-white-600 hover:bg-primary transition-all duration-300 text-gray-600 '>
       <b> Efficiency</b>
       <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
       </div>
       <div className='flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:text-white-600 hover:bg-primary transition-all duration-300 text-gray-600 '>
       <b>Convenience:</b>
       <p>Access to a network of trusted healthcare professionals in your area.</p>
       </div>
       <div className='flex flex-col border px-10 md:px-16 py-8 sm:py-16 gap-5 text-[15px] hover:text-white-600 hover:bg-primary transition-all duration-300 text-gray-600 '>
       <b>Personalization:</b>
       <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
       </div>
      </div>
     </div>
    
  )
}

export default About
