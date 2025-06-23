import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';
import Title from './Title';

const FeaturedDestination = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/rooms');
        setRooms(res.data.rooms.slice(0, 4)); // Show only first 4 rooms
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-50 py-12 sm:py-16 md:py-20'>
      <Title
        title='Rooms with a View'
        subTitle='Our resort offers unparalleled luxury and unforgettable experiences. Explore rooms tailored to meet your every need.'
      />

            <div className='flex flex-wrap justify-center gap-6 mt-12 sm:mt-16'>
        {rooms.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
           
        ))}
          {rooms.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
           
        ))}
      </div>
        
       
      
    </div>
  );
};

export default FeaturedDestination;
