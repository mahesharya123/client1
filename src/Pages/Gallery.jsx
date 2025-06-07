
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { assets} from '../assets/assets';

import { Navigation, Pagination } from 'swiper/modules';

const imageData = {
  hotel: [
  
       assets.resort1,
         assets.Her,
      assets.resort2,
  ],
  rooms: [
  
   assets.Room3,
    assets.Room1,
   assets.Room3,
  ],
  diningroom: [
    assets.DiningRoom1,
     assets.DiningRoom3,
    assets.DiningRoom2,
   
  ],
  outside:[
    assets.outside1,
    assets.outside2,
    assets.outside4,
  ]
};

const ImageSection = ({ title, images }) => (
  <div className="mb-16">
    <h2 className="text-3xl  font-playfair mb-6 text-center">{title}</h2>
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="w-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`${title} ${index + 1}`}
            className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-96"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const GalleryPage = () => {
  return (
    <div className="px-6 py-10 max-w-10xl mx-auto "   >
      <h1 className=" mb-12 text-4xl text-center w-full bg-[black] bg-opacity-50 px-18 py-2 w-70 text-white  text-m rounded mt-10">Gallery</h1>
  
     <ImageSection title="Hotel View" className="mt-4" images={imageData.hotel} />
      <ImageSection title="Room Interiors" className="mt-4" images={imageData.rooms} />
      <ImageSection title="Dining Room" images={imageData.diningroom} />
      <ImageSection title="Outside View" images={imageData.outside} />
    </div>
  );
};

export default GalleryPage;
