import React, { useEffect, useState } from 'react';
import { assets, facilityIcons } from '../assets/assets';
import { useNavigate } from 'react-router';
import Starrating from '../Components/Starrating';

const AllRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/rooms');
        const data = await res.json();
        if (res.ok) {
          setRooms(data.rooms);
        } else {
          setError(data.message || 'Failed to fetch rooms');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p className='pt-28 text-center text-gray-600'>Loading rooms...</p>;
  }

  if (error) {
    return <p className='pt-28 text-center text-red-500'>{error}</p>;
  }

  return (
    <div className='flex flex-col pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Heading */}
      <div className='mb-10'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Rooms at Coral Creek</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2'>
          Experience the Perfect Blend of Comfort, Luxury and create unforgettable memories.
        </p>
      </div>

      {/* Room List */}
      {rooms.map((room) => (
        <div
          key={room._id}
          className='flex flex-col md:flex-row gap-8 items-start border-b border-gray-300 py-10 last:border-0'
        >
          {/* Left - Image */}
          <div className='w-full md:w-1/2'>
            <img
              onClick={() => {
               if(room.isAvailable){
                 navigate(`/rooms/${room._id}`);
               }
               else{
                alert(`Sorry! ${room.roomType} is not available please book another room`)
               }
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt='hotel-img'
              title='View Room Details'
              className='w-full h-64 md:h-80 object-cover rounded-xl shadow-md cursor-pointer'
            />
          </div>

          {/* Right - Text + Button */}
          <div className='w-full md:w-1/2 flex flex-col justify-between'>
            <div>
              <p className='text-gray-500'>{room.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className='text-gray-800 text-3xl font-playfair cursor-pointer mt-1'
              >
                {room.roomType}
              </p>

              <div className='flex items-center mt-2'>
                <Starrating />
                <p className='ml-2'>100+ reviews</p>
              </div>

              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt='location-icon' className='w-4 h-4' />
                <span>{room.location}</span>
              </div>

              {/* Amenities */}
              <div className='flex flex-wrap items-center mt-4 gap-3'>
                {room.features?.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 px-3 py-2 bg-[#F5F5FF]/70 rounded-lg'
                  >
                    
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between mt-6'>
              <p className='text-xl font-semibold text-gray-700'>
                Rs {room.pricePerNight} / night
              </p>
              <button
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className='bg-black text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition'
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRoom;
