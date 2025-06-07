import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const HotelCard = ({ room, index }) => {
  const navigate = useNavigate();

  return (
    <div
      key={room._id}
      className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'
    >
      <img src={room.images[0]} alt="" />
      {index % 2 !== 0 && (
        <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
          Best Seller
        </p>
      )}
      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-x1 font-medium text-gray-800'>
            {room.hotel.name}
          </p>
          <div className='flex items-center gap-1'>
            <img src={assets.starIconFilled} alt='star-icon' /> 4.5
          </div>
        </div>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.locationIcon} alt='location-icon' />
          <span>{room.hotel.address}</span>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p>
            <span className='text-x1 text-gray-800'>RS {room.pricePerNight}</span>/night
          </p>
          <button
            onClick={() => {
              navigate(`/rooms/${room._id}`);
              scrollTo(0, 0);
            }}
            className='px-4 py-2 text-sm text-white font-medium border border-gray-300 bg-black rounded hover:bg-gray-50 transition-all cursor-pointer'
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
