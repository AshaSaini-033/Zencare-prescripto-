import { createContext, useState,useEffect, useContext} from "react";
// import { doctors } from "../assets/assets";
import {toast} from 'react-toastify'
import axios from "axios";




export const AppContext =createContext();

const AppContextProvider=(props)=>{
    const currencySymbol='$'
const backendUrl=import.meta.env.VITE_BACKEND_URL
console.log(backendUrl)
const [doctors,setDoctors]= useState([])
const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
const [userData,setUserData]=useState(null)


const getAllDoctorsData =async()=>{
    try{
        const {data}=await axios.get(backendUrl+'/api/doctor/list')
        if(data.success){
            setDoctors(data.doctors)
        }
        else{
            toast.error(data.message)
        }
    }catch(error){
        console.log(error)
       toast.error(error.message)
    }
}
const loadUserProfileData = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/user/get-profile",
      { headers: { token } }   // 👈 sahi
    );

    console.log("PROFILE API RESPONSE:", data);

    if (data.success) {
      setUserData(data.userData);  //  bas ye
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const value ={
    doctors,currencySymbol,token,setToken,backendUrl,userData,
    setUserData,getAllDoctorsData,loadUserProfileData
}
useEffect(()=>{
    getAllDoctorsData()
},[])
useEffect(()=>{
    if(token){
        loadUserProfileData()
    }
    else{
        setUserData(null)
    }
},[token])

return (
    <AppContext.Provider value = {value}>
        {props.children}
    </AppContext.Provider>
)
}
export default AppContextProvider