import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center '>
      <p>CONTACT <b>US</b></p>
    
      </div>
      <div className='flex flex-row gap-8 my-6 px-20 py-5'>
        <div>
          <img className="w-full md:max-w-[360px]"src = {assets.contact_image}/>
        </div>
        <div className='flex flex-col gap-3 text-sm text-gray-600 '>
          <b>Our OFFICE</b>
          <p>54709 Willms Station 
Suite 350, Washington, USA</p>
<p>Tel: (415) 555‑0132</p>
<p>Email: greatstackdev@gmail.com</p>
<b>Careers at PRESCRIPTO</b>
<p>Learn more about our teams and job openings.</p>
<button className='border border-black text-gray-600 hover:bg-primary text-sm my-5 w-20'>Explore Job</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
