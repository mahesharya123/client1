import React from 'react';

const RoomCard = ({ type, price, features, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="h-90 overflow-hidden">
        <img 
          src={image} 
          alt={type} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{type}</h3>
          <div className="text-2xl font-bold text-amber-600">Rs {price}</div>
        </div>
        
        <ul className="mt-4 space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className="w-full bg-black hover:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;