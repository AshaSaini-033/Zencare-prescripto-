import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../Context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setDToken}=useContext(DoctorContext)
  const navigate = useNavigate()   // add navigation

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      //api call here
      if (state === 'Admin') {
        //call api
        const { data } = await axios.post(backendUrl+'/api/admin/login', { email, password })
       // console.log("Full API response:", data);
        if (data.success) {
          // console.log("Token is:")
          // console.log(data.atoken)
          localStorage.setItem('aToken', data.atoken)
          setAToken(data.atoken)
          toast.success("Login successful")
        //  navigate('/admin-dashboard');   //  redirect to admin page
        } else {
          toast.error(data.message || "Login Failed")
        }
      }
      else{
          const { data } = await axios.post(backendUrl+'/api/doctor/login', { email, password })
          console.log('Doctor login response:', data); // <--- add this
         if (data.success) {
          console.log(data.token)
  localStorage.setItem('dToken', data.token) // <-- use data.token
  setDToken(data.token)                      // <-- use data.token
  toast.success("Login successful")
} else {
            toast.error(data.message || "Login Failed")

          }
       
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-2 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl m-auto shadow-lg'>
        <p className='text-primary text-2xl m-auto'><span>{state}</span> Login</p>
        <div>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border boder-gray roundedmt-1 mt-1 p-2 w-full' type="text" />
        </div>
        <div>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full mt-1 p-2 border border-gray rounded' type="password" />
        </div>
        <button className="w-full mt-1 p-2 bg-primary rounded text-center">Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login?<span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login?<span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
