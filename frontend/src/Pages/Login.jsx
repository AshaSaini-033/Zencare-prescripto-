import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state,setState] =useState('Sign Up')
  const [name ,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword] = useState('');
  const {backendUrl,setToken,token}=useContext(AppContext)
  const nevigate = useNavigate()
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
       if(state==='Sign Up'){
      const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password})
      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
  }else{
    //login api
     const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
      if(data.success){
        console.log("TOKEN FROM API:", data.token); 
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
  }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      nevigate('/')
    }
  },[token] )
  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-gray-600 text-4xl '>{state==='Sign Up'?"Create Account":"Login"}</p>
        <p className='text-xl'>Please {state==='Sign Up'?"sign up":"log in" } to book appointment</p>
        {
          state==='Sign Up'&&
            <div >
          <p>Full Name</p>
          <input type="text"  className='border border-gray-600'onChange={(e)=>setName(e.target.value) }value={name} required/>
         </div>

        }
        
           <div>
          <p>Email</p>
          <input type="email" className='border border-gray-600' onChange={(e)=>setEmail(e.target.value) }value={email} required/>
         </div>
           <div>
          <p>Password</p>
          <input type="password" className='border border-gray-600' onChange={(e)=>setPassword(e.target.value) }value={password} required/>
         </div>
         <button type="submit" className=' w-full rounded-l rounded-r text-white text-3xl text-center bg-primary'>{state==='Sign Up'?"Create Account":"Login"}</button>
         {
          state==="Sign Up"?
          <p>Already have an account? <span  onClick={()=>setState('Login')}className='text-primary underline cursor-pointer' >Login here</span></p>:
          <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'> Click here</span></p>
         }
      </div>
    </form>
  )
}

export default Login
