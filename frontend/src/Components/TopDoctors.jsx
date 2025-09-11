import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // pick first 4 (or top rated later if you add ratings)
  const topDocs = doctors.slice(0, 16);

  return (
    <div className="my-10 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">Top Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {topDocs.map((doc) => (
          <div
            key={doc._id}
            onClick={() => navigate(`/book-appointment/${doc._id}`)}
            className="border rounded-xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-48 object-cover bg-gray-100"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{doc.name}</h3>
              <p className="text-gray-600">{doc.speciality}</p>
              <p className="text-sm text-green-500 mt-2">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
