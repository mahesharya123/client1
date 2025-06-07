import React from 'react';
import { roomsDummyData } from '../assets/assets';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router';

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-50 py-12 sm:py-16 md:py-20'>
      <Title
        title='Rooms with a View'
        subTitle='Our resort offers unparalleled luxury and unforgettable experiences. Explore rooms tailored to meet your every need.'
      />
      
      <div className='flex flex-wrap justify-center gap-6 mt-12 sm:mt-16'>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

     
    </div>
  );
};

export default FeaturedDestination;
