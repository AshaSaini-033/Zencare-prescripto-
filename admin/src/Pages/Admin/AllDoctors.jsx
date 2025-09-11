import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const AllDoctors = () => {
  const { doctors, aToken ,getAllDoctors, changeAvailability} = useContext(AdminContext);
  

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-xl font-medium">All Doctors</h1>
      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((item) => (
            <div
              key={item._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer grow"
            >
              <img
                className="bg-indigo-50 w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-neutral-600 text-lg font-medium">{item.name}</p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-4 h-4"
                  />
                  <p>{item.available ? 'Available' : 'Unavailable'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;
