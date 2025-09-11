import React, { useContext, useState } from 'react'

import {assets} from '../../assets/assets'

import { toast } from 'react-toastify';
import { AdminContext } from '../../Context/AdminContext';
import axios from 'axios';

const AddDoctors = () => {

const [docImg,setDocImg] = useState(false);

 const [name,setName]=useState("");

 const [email,setEmail]=useState("");

 const [password,setPassword]=useState("");

 const [experience,setExperience]=useState("");

   const [fees,setFees]=useState("");

    const [about,setAbout]=useState("");

     const [speciality,setspeciality]=useState("");

      const [degree,setDegree]=useState("");

       const [line1,setLine1]=useState("");

        const [line2,setLine2]=useState("");
        const {aToken,backendUrl} = useContext(AdminContext)
        const onSubmitHandler=async(event)=>{

        event.preventDefault() 
         console.log(" Form submitted");  //not reload the web page

        try{

        if(!docImg){

         return toast.error("Image Not Selected")

        }

        const formData=new FormData()

        formData.append('image',docImg)

        formData.append('name',name)

        formData.append('email',email)

        formData.append('password',password)

        formData.append('experience',experience)

        formData.append('degree',degree)

        formData.append('speciality',speciality)

        formData.append('fees',Number(fees))

        formData.append('about',about)

        formData.append('address',JSON.stringify({line1:line1,line2:line2})) //convert in object 

        //consolelog form data

        formData.forEach((value,key)=>{

         console.log(`${key}:${value}`)

})
const { data } = await axios.post(
  backendUrl + "/api/admin/add-doctors",
  formData,
  {
    headers: {
      atoken: aToken,
      "Content-Type": "multipart/form-data",
    },
  }
);

if(data.success){
  toast.success(data.message)
    // Reset form fields
  setDocImg(false);
  setName("");
  setEmail("");
  setPassword("");
  setExperience("");
  setFees("");
  setAbout("");
  setspeciality("");
  setDegree("");
  setLine1("");
  setLine2("");
}else{
  toast.error(data.message)
}
        }catch(error){

    

        }

       }

 return (

 <form onSubmit={onSubmitHandler}className='m-5 w-full'>

  <p className='mb-3 text-lg font-medium'>Add Doctors</p>

  <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-auto'>

   <div className='flex items-center gap-4 mb-8 text-gray-700'>

    <label htmlFor='doc-img'>

     <img className='w-24 bg-gray-600 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg):assets.upload_area}/>

    </label>

    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>

    <p>Upload Doctor <br/>Picture</p>

   </div>

   <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

    <div className='w-full lg:flex-1 flex flex-col gap-4'>

     <div className='flex-1 flex flex-col gap-1'>

      <p>Doctor Name </p>

      <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2 ' type ="text" placeholder='Name' required/>

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p>Doctor Email </p>

      <input autoComplete="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 ' type ="email" placeholder='Email' required/>

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p >Doctor Password </p>

      <input autoComplete="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 ' type ="password" placeholder='PassWord' required/>

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p>Doctor Experience</p>

     <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2 ' name="exp" id="exp">

      <option value="0 Year"></option>

      <option value="1 Year">1 Year</option>

      <option value="2 Year">2 Year</option>

      <option value="3 Year">3 Year</option>

      <option value="4 Year">4 Year</option>

      <option value="5 Year">5 Year</option>

      <option value="6 Year">6 Year</option>

      <option value="7 Year">7 Year</option>

      <option value="8 Year">8 Year</option>

      <option value="9 Year">9 Year</option>

      <option value="10 Year">10 Year</option>

     </select>

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p> Doctor Fees </p>

      <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 'type ="number" placeholder='Fees' required/>

     </div>

     </div>

     <div className='w-full lg:flex-1 flex flex-col gap-4'>

     <div className='flex-1 flex flex-col gap-1'>

      <p> Doctor Education</p>

      <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 'type ="text" placeholder='Education' required/>

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p > Doctor Speciality</p>

      <select onChange={(e)=>setspeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 'name="spec" id="spec">

       <option value="Nothing"> </option>

      <option value="General physician">General physician</option>

      <option value="Gynecologist">Gynecologist</option>

      <option value="Dermatologist">Dermatologist</option>

      <option value="Pediatricians">Pediatricians</option>

      <option value="Neurologist">Neurologist</option>

      <option value="Gastroenterologist">Gastroenterologist</option>

     

     </select>

  

     </div>

     <div className='flex-1 flex flex-col gap-1'>

      <p>Doctor Address</p>

      <input onChange={(e)=>setLine1(e.target.value)} value={line1} className='border rounded px-3 py-2 ' type ="text" placeholder='line1' required/>

      <input onChange={(e)=>setLine2(e.target.value)} value={line2} className='border rounded px-3 py-2 'type ="text" placeholder='line2' />

     </div>

     </div>

  

    </div>



 

  <div className='flex-1 flex flex-col gap-1'>

      <p className='mt-4 mb-2 text-grayy-600'> Doctor About </p>

      <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 py-3 mt-4 text-gray-600 rounded ' type="text" placeholder='write about doctor' rows={5} required/>

     </div>

   

     <button type="submit" className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

  

     </div>

 </form>

 )

}



export default AddDoctors