import React from 'react';
import { FaBed, FaUtensils, FaMusic } from 'react-icons/fa';
import { roomsDummyData } from '../assets/assets';
import RoomCard from '../Components/RoomCard';
import ServiceSection from '../Components/ServiceSection';
import { Link, useNavigate } from 'react-router-dom';


// Import room images
import { assets } from '../assets/assets';

const Services1 = () => {

  const roomFeatures = [
    "Free WiFi",
    "AC with climate control",
    "Smart TV with streaming",
    "24/7 room service",
    "Private bathroom with amenities"
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Premium Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience luxury accommodation, exquisite dining, and perfect event spaces
        </p>
      </header>

      {/* Rooms Section */}
      <ServiceSection title="Luxury Accommodation" icon={<FaBed className="text-amber-600 text-2xl" />}>
        <div className="grid md:grid-cols-2 gap-8">
          <RoomCard 
            type="Super Deluxe Room" 
            price="3500" 
            features={["King size bed", ...roomFeatures, "Balcony with view"]}
            image={assets.Room1} 
            id= {roomsDummyData[0]._id}
          />
          <RoomCard 
            type="Semi Deluxe Room" 
            price="3000" 
            features={["Queen size bed", ...roomFeatures]}
            image={assets.Room3}
           id={roomsDummyData[1]._id}
          
          /> 
           
        </div>
      </ServiceSection>

      {/* Restaurant Section */}
      <ServiceSection title="Fine Dining Restaurant" icon={<FaUtensils className="text-amber-600 text-2xl" />}>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
          <div className="flex items-center mb-6">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Exquisite Culinary Experience</h3>
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">
            Experience culinary excellence with our diverse menu crafted by award-winning chefs. 
            We use locally sourced ingredients to create unforgettable dishes.
          </p>
          
          <Link 
            to="/restaurant-menu"
            className="inline-flex items-center bg-black hover:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            View Full Menu
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </ServiceSection>

      {/* Party Hall Section */}
      <ServiceSection title="Party Hall & Events" icon={<FaMusic className="text-amber-600 text-2xl" />}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.06-6.365m-1.313 8.485a9 9 0 010-12.728" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Premium Event Space</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Professional sound system with DJ setup</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Capacity: 150+ guests</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Dedicated event planning team</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Customizable lighting systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Catering services available</span>
              </li>
            </ul>
            
            <button  className="mt-2 bg-black hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Book Now
            </button>
          </div>
          
          <div className="rounded-xl overflow-hidden">
            <img 
              src={assets.DiningRoom3} 
              alt="Party Hall" 
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </ServiceSection>
    </div>
  );
};

export default Services1;