import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import Speciality from './Speciality'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({Speciality,docId}) => {
    const {doctors}=useContext(AppContext)
    const [reDoc,setRelDoc] =useState([])
    const navigate =useNavigate()
    useEffect(()=>{
        if(doctors.length>0 && Speciality){
            const doctorsData  = doctors.filter((doc)=>doc.speciality===Speciality &&doc._id!==docId)
            setRelDoc(doctorsData)
        }},[doctors,Speciality,docId])
  return (
   <div className="flex flex-col items-center gap-4 my-16 text-gray-600 md:mx-10">
      <h2 className="text-2xl font-bold text-center mb-6">Related Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {reDoc.slice(0,5).map((item,index) => (
          <div
            key={index}
            onClick={() => {navigate(`/book-appointment/${item._id}`); scrollTo(0,0)}}
            className="border rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover bg-gray-100"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-sm text-green-500 mt-2">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
