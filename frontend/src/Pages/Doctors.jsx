import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContextProvider, { AppContext } from "../Context/AppContext";


const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);
  const nevigate = useNavigate()
  
 console.log(speciality)
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
        <div >
         <p className="text-gray-600">Browser through the doctor speciality</p>
         <div className="flex flex-col sm:flex-row mt-5">
          <div className="flex flex-col gap-4 ">
              <p  onClick={() =>
    speciality === "GeneralPhysician"
      ? nevigate("/doctors")
      : nevigate("/doctors/GeneralPhysician")
  } className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="GeneralPhysician"?"bg-indigo-100 text-black":""}`}>General Physician</p>
              <p onClick={()=>speciality==='Gynecologist' ?nevigate('/doctors'):nevigate('/doctors/Gynecologist')} className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>          
               <p onClick={()=>speciality==='Dermatologist' ?nevigate('/doctors'):nevigate('/doctors/Dermatologist')}  className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
               <p onClick={()=>speciality==='Pediatricians' ?nevigate('/doctors'):nevigate('/doctors/Pediatricians')}  className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
               <p  onClick={()=>speciality==='Neurologist' ?nevigate('/doctors'):nevigate('/doctors/Neurologist')} className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
               <p onClick={()=>speciality==='Gastroenterologist' ?nevigate('/doctors'):nevigate('/doctors/Gastroenterologist')}  className={`w-[20vw] mr-5 sm:auto pl-3 py-1.5 border border-gary-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
            
          </div>
        {/* rigth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {
          filterDoc.map((items,index)=>(
 <div key={index}className="max-w-sm border border-gray-200 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden" >
   
  <img onClick={()=>nevigate(`/book-appointment/${items._id}`)}src={items.image}alt="Card" className="w-full h-48 object-cover bg-blue-100"/>
  <div className="p-6">
    <div className='flex items-center text-center gap-2 text-green-500'>
 <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
  </div>
    <h2 className="text-lg text-gray-900 font-bold mb-2">{items.name}</h2>
    <p className="text-gray-600 mb-4">{items.speciality}</p>
   
  </div>
  </div>
  ))}
   </div>
       
    </div>
    </div>

  )
}

export default Doctors  