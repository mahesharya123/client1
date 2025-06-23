import React from 'react';
import { useState } from 'react';
import { FaBed, FaUtensils, FaMusic } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Services1 = () => {
  const navigate = useNavigate();
  const roomFeatures = [
    'Free WiFi',
    'AC with climate control',
    'Smart TV with streaming',
    'Free Car Parking',
  ];
  const [showModal, setShowModal] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const images = [
    assets.Room1,
    assets.Room3,
   
  ];

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} right-2 z-10`} 
        style={{ ...props.style, display: 'block', background: 'black', borderRadius: '50%' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} left-2 z-10`} 
        style={{ ...props.style, display: 'block', background: 'black', borderRadius: '50%' }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Premium Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience luxury accommodation, exquisite dining, and perfect event spaces
        </p>
      </header>

      {/* Rooms Section */}
      <section className="flex flex-col md:flex-row gap-10 items-center mb-20">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaBed className="text-amber-600 mr-2" /> Luxury Accommodation
          </h2>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>Super Deluxe Room with King size bed</li>
            <li>Semi Deluxe Room with Queen size bed</li>
           
            {roomFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700"
          >
            All Rooms
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index} className="px-2">
                <img
                  src={img}
                  alt={`Room Image ${index + 1}`}
                  className="rounded-xl h-80 object-cover w-full"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="flex flex-col md:flex-row-reverse gap-10 items-center mb-20">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUtensils className="text-amber-600 mr-2" /> Fine Dining Restaurant
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Experience culinary excellence with our diverse menu crafted by award-winning chefs. 
            We use locally sourced ingredients to create unforgettable dishes.
          </p>
          <Link
            to="/restaurant-menu"
            className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700"
          >
            View Full Menu
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={assets.DiningRoom1}
            alt="Dining"
            className="rounded-xl h-80 object-cover w-full shadow-lg"
          />
        </div>
      </section>

      {/* Party Hall Section */}
      <section className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaMusic className="text-amber-600 mr-2" /> Party Hall & Events
          </h2>
          <ul className="text-gray-700 space-y-3 mb-6">
            <li>Professional sound system </li>
            <li>Capacity: 150+ guests</li>
            <li>Dedicated event planning team</li>
            <li>Customizable lighting systems</li>
          </ul>
         <button
  onClick={() => setShowModal(true)}
  className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700"
>
  Book Now
</button>

        </div>
        <div className="w-full md:w-1/2">
          <img
            src={assets.DiningRoom3}
            alt="Party Hall"
            className="rounded-xl h-80 object-cover w-full shadow-lg"
          />
        </div>
      </section>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center relative">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Book Our Party Hall</h2>
      <p className="text-gray-600 mb-4">
        For bookings and availability, please contact us directly at the number below.
        Our team will assist you in making your event truly unforgettable.
      </p>
      <p className="text-lg font-semibold text-blue-600 mb-6">📞 Call Now: <a href="tel:9474206075">9474206075</a></p>
      <button
        onClick={() => setShowModal(false)}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Services1;