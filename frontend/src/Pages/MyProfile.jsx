import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name || "")
      formData.append('phone', userData.phone || "")
      formData.append('dob', userData.dob || "")
      formData.append('gender', userData.gender || "")
      formData.append('address', JSON.stringify(userData.address || { line1: "", line2: "" }))

     image && formData.append('image', image)

      

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  

  return userData && (
    <div className="flex flex-col max-w-lg gap-2 text-sm">
      <div>
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="profile"
              />
             <img  src = {image ?" ":assets.upload_icon}/>
             
            </div>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>
        ) : (
          <img className="max-w-44 rounded" src={userData.image} alt="profile" />
        )}

        {isEdit ? (
          <input
            className="text-3xl text-gray-600"
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            value={userData.name || ""}
            type="text"
          />
        ) : (
          <p className="text-3xl text-gray-600">{userData.name}</p>
        )}
      </div>

      <hr className="bg-gray-200 border-null" />

      {/* CONTACT INFO */}
      <div>
        <p className="text-neutral-600 underline">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-5 text-gray-600">
          <p>Email id :</p>
          {isEdit ? (
            <input
              value={userData.email || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              type="email"
            />
          ) : (
            <p className="underline text-primary">{userData.email}</p>
          )}

          <p>Phone No :</p>
          {isEdit ? (
            <input
              value={userData.phone || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              type="text"
            />
          ) : (
            <p className="text-primary">{userData.phone}</p>
          )}

          <p>Address :</p>
          {isEdit ? (
            <div className='border border-gray-600'>
              <input
                value={userData?.address?.line1 || ""}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
                type="text"
              />
              <br />
              <input
                value={userData?.address?.line2 || ""}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
                type="text"
              />
            </div>
          ) : (
            <p>
              {userData?.address?.line1 || "Not Provided"}
              <br />
              {userData?.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* BASIC INFO */}
      <div>
        <p className="text-neutral-600 underline mt-5">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-5 text-gray-600">
          <p>Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <p>{userData.gender || "Not Provided"}</p>
          )}

          <p>Birthday:</p>
          {isEdit ? (
            <input
              value={userData.dob || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              type="date"
            />
          ) : (
            <p>{userData.dob || "Not Provided"}</p>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-4">
        {isEdit ? (
          <>
            <button
              className="border border-gray-600 hover:bg-primary text-xl rounded-full w-60 mr-2"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
            <button
              className="border border-gray-600 hover:bg-red-400 text-xl rounded-full w-40"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="border border-gray-600 hover:bg-primary text-xl rounded-full w-20"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile  