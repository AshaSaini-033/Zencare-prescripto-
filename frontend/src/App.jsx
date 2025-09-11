import React from 'react'
import About from './Pages/About'
import Home from './Pages/Home'
import Login from './Pages/Login'
import {Routes, Route} from 'react-router-dom'
import Doctors from './Pages/Doctors'
import Navbar from './Components/Navbar'
import MyProfile from './Pages/MyProfile'
import MyAppointment from './Pages/MyAppointment'
import Appointment from './Pages/Appointment'
import Footer from './Components/Footer'
import Contact from './Pages/Contact'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (

    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer/>
      <Navbar/>
   <Routes>
    <Route path='/' element ={<Home/>}/>
    <Route path ='/doctors' element={<Doctors/>}/>
    <Route path ='/login' element={<Login/>}/>
    <Route path = '/about' element ={<About/>}/>
    <Route path = '/doctors/:speciality' element ={<Doctors/>}/>
    <Route path ='/my-profile' element = {<MyProfile/>}/>
    <Route path ='/my-appointments' element ={<MyAppointment/>}/>
    <Route path ='/book-appointment/:docId' element ={<Appointment/>}/>
    <Route path="/contact" element={<Contact/>}/>
   </Routes>
    <Footer/>
    </div>
  )
}

export default App
