import React, { useContext, useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Components/RelatedDoctors';
import axios from 'axios';

import { toast } from 'react-toastify';
const Appointment = () => {
  const {docId} = useParams();
  const {doctors,currencySymbol,backendUrl,token,getAllDoctorsData,userData} = useContext(AppContext);
  const [docInfo,setDocInfo] = useState(null);
  const [docSlot,setDocSlot] =useState([]);
    const [slotIndex,setSlotIndex] =useState(0);
    const [slotTime,setSlotTime] = useState(null)
    const nevigate = useNavigate();
    const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  //   const getavailableSlot = async()=>{
  //     setDocSlot([]);
  //     let today = new Date();
  //     for(let i=0;i<7;i++)
  //     {
  //       let currDate =new Date(today);
  //       currDate.setDate(today.getDate()+i);
  //     //  setting end time  
  //       let endTime = new Date();
  //       endTime.setDate(today.getDate()+i);
  //       endTime.setHours(21,0,0,0)
  //       //setting hour
  //       if(today.getDate()===currDate.getDate())
  //       {
  //         currDate.setHours(currDate.getHours()>10?currDate.getHours()+1:10);
  //         currDate.setMinutes(currDate.getMinutes()>30?30:0)
  //       }else{
  //         currDate.setHours(10);
  //         currDate.setMinutes(0);
  
  //       }
  //       let timeSlot =[]
  //       while(currDate<endTime){
  //        let formatedTime = currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  //     let day = currDate.getDay();
  //      let month = currDate.getMonth()+1;
  //       let year = currDate.getFullYear();
  //     const slotDate = day+"_"+month+"_"+year;
  //    const slotTime = formatedTime

  //       const isSlotAvailable = docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime)?false:true
  //       if(isSlotAvailable){
  // // //add slot to array
  //         timeSlot.push({
  //           datetime:new Date(currDate),
  //           time:formatedTime});
      
  //         }
         
  //         //increment time by 30 min
  //        currDate.setMinutes(currDate.getMinutes()+30)
  //     }
        
  //       setDocSlot(prev=>([...prev,timeSlot]))
      
  //     }
  //   }
  const getavailableSlot = async () => {
  if (!docInfo) return;  // don’t run if doctor not loaded

  setDocSlot([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currDate = new Date(today);
    currDate.setDate(today.getDate() + i);

    // end of working hours (9 PM)
    let endTime = new Date();
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    // set starting time
    if (today.getDate() === currDate.getDate()) {
      currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
      currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currDate.setHours(10);
      currDate.setMinutes(0);
    }

    let timeSlot = [];

    while (currDate < endTime) {
      let formatedTime = currDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      let day = currDate.getDate();   //  correct date
      let month = currDate.getMonth() + 1;
      let year = currDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const slotTime = formatedTime;

      const isSlotAvailable =
        docInfo?.slot_booked?.[slotDate] &&
        docInfo.slot_booked[slotDate].includes(slotTime)
          ? false
          : true;

      if (isSlotAvailable) {
        timeSlot.push({
          datetime: new Date(currDate),
          time: formatedTime,
        });
      }

      currDate.setMinutes(currDate.getMinutes() + 30);
    }

    setDocSlot((prev) => [...prev, timeSlot]);
  }
};

  const fetchDocInfo =async()=>
  {
     const docInfo = doctors.find(doc=>doc._id===docId);
     setDocInfo(docInfo)
  }
  const bookAppointment = async()=>{
   if(!token) {
    toast.warn('Login to Book appointments')
    return nevigate('/login')
   }
   try{
    //store selected date with variable slotDate
    const date = docSlot[slotIndex][0].datetime
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
const slotDate = day+"_"+month+"_"+year
//console.log(slotDate)  
//api call to book
const {data} = await axios.post(backendUrl+'/api/user/book-appointment', {
        userId: userData._id,
        userData: {
          name: userData.name,
          email: userData.email,
        },
        docId: docInfo._id,
        doctorData: {
          name: docInfo.name,
          speciality: docInfo.speciality,
        },
      slotDate,
      slotTime,
      },{ headers:{token}})
if(data.success){
  toast.success(data.message)
getAllDoctorsData()
nevigate('/my-appointments')
}else{
  toast.error(data.message)
}
 }
   catch(error){
    console.log(error)
    toast.error(error.message)
   }

  }
  console.log(docInfo)
 useEffect(()=>{
    fetchDocInfo()
 },[doctors,docId])
 useEffect(()=>{
   getavailableSlot()
 },[docInfo])
 useEffect(()=>{
 
  console.log(docSlot)
 },[docSlot])
  return docInfo && (
    <div >
       {/* photo wala */}
       <div className='flex flex-col sm:flex-row gap-4'>
          <div>
           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image}/>
            </div>
        {/* name experience degree  */}
        
            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
             <p className='flex items-center gap-2 text-2xl font-medium text-gray-600'> {docInfo.name}<img className='w-5' src={assets.verified_icon}/></p>
    
          
           <div className='flex items-center gap-2 text-md mt-1'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='border border-gray-400 rounded-lg text-gray-600 w-20'>{docInfo.experience}</button>
         </div>
      <div>
        <p className='flex items-center gap-2 text-md my-3 font-medium text-gray-600'>
          About <img src={assets.info_icon}/>
        </p>
           <p className='flex items-center gap-2 text-sm font-medium my-5 text-gray-600'>{docInfo.about}</p>
      </div>
               <p className='mt-12 text-gray-600 text-2xl'>Appointment Fee : <span className='text-black text-md'>{currencySymbol}50</span></p>     
       </div>
       </div>
       {/* Booking Slot */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
  <p>Booking Slots</p>

  {/* Day Selector */}
  <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
    {docSlot?.length > 0 ? (
      docSlot.map((item, index) => (
        <div
          onClick={() => setSlotIndex(index)}
          className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
            slotIndex === index ? "bg-primary text-white" : "border border-gray-600"
          }`}
          key={index}
        >
          <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
          <p>{item[0] && item[0].datetime.getDate()}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No slots available</p>
    )}
  </div>

  {/* Time Selector */}
  <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
    {docSlot?.[slotIndex]?.length > 0 ? (
      docSlot[slotIndex].map((item, index) => (
        <p
          onClick={() => setSlotTime(item.time)}
          className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
            item.time === slotTime ? "bg-primary text-white" : "text-gray-600"
          }`}
          key={index}
        >
          {item.time ? item.time.toLowerCase() : "N/A"}
        </p>
      ))
    ) : (
      <p className="text-gray-500">No times available</p>
    )}
  </div>

  {/* Book Button */}
  <button onClick={bookAppointment}className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
    Book an Appointment
  </button>
</div>
      {/* Listing doctors */}
      <RelatedDoctors docId={docId} Speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
