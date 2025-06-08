// src/pages/AboutCoralCreek.jsx
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router';

const AboutCoralCreek = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-emerald-900/60 z-10"></div>
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Coral Creek Resort</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl">Experience Nature and Comfort in the Heart of Baratang Island</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button  onClick={()=>{navigate('/rooms')}} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-lg transition duration-300">
              Book Your Stay
            </button>
            <button onClick={()=>{navigate('/Gallery')}} className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition duration-300">
              View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="bg-gray-200   rounded-xl w-full h-96" > <img height={100} src= {assets.resort2}/> </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Coral Creek Resort</h2>
            <p className="text-lg text-gray-600 mb-4">
              For the travel heads visiting Baratang, only a handful of hotels are capable of playing the perfect host. Coral Creek Resort offers an efficient security system & amazing facilities, making it one of the top hotels in Baratang Island for travellers who wish to admire nature and comfort in one place.
            </p>
            <p className="text-lg text-gray-600">
              Our resort is designed to blend seamlessly with the surrounding natural beauty, providing a tranquil escape where you can relax and rejuvenate while being surrounded by the stunning landscapes of the Andaman Islands.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Prime Location</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
            
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Island Paradise Setting</h3>
              <p className="text-lg text-gray-600 mb-6">
                Coral Creek Resort is beautifully situated at the Great Andaman Trunk Road on Baratang Island in the Andaman and Nicobar Islands. Our picturesque location offers breathtaking views and easy access to the island's natural wonders.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Nearby Attractions</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Catholic Church of Adazig</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Lutheran Church of Adazig</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Limestone Caves</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Parrot Island</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-1 mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Mud Volcano</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-200  rounded-xl w-full h-96" > <img height={'100px'} src= {assets.limestone}/> </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Exceptional Facilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience comfort and convenience with our wide range of amenities designed to make your stay memorable</p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Luxurious Accommodations", 
                description: "Comfortable, minimalistically designed yet elegant rooms with king-sized beds, AC, TV, and stunning nature views",
                icon: "🏨"
              },
              { 
                title: "Free Wi-Fi & Breakfast", 
                description: "Stay connected with complimentary high-speed internet and enjoy daily free breakfast buffet",
                icon: "📶"
              },
              { 
                title: "Dining Experience", 
                description: "Restaurant serving Chinese, Indian, Continental and local delicacies with sea views",
                icon: "🍽️"
              },
              { 
                title: "Family Friendly", 
                description: "Free accommodation for kids, playground, indoor play area, and family suites",
                icon: "👨‍👩‍👧‍👦"
              },
              { 
                title: "Transportation", 
                description: "Free car parking, electric vehicle charging, and tour assistance",
                icon: "🚗"
              },
              { 
                title: "Scenic Spaces", 
                description: "Private seating areas, rooftop terrace with panoramic views of sunrise and sunset",
                icon: "🌅"
              }
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Tariffs Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Room Options & Tariffs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose from our comfortable accommodations tailored for every traveler</p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          
          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="   w-full h-60"><img src= {assets.Room1}/> </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2"> Super Deluxe Room</h3>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-amber-600">₹3,500</span>
                  <span className="text-gray-500 ml-2">/ night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>King-sized bed</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Private balcony</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>AC & TV</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    
                  </li>
                </ul>
                <button onClick={()=>{navigate(`/rooms/67f76452197ac559e4089b8e`)}} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
             <div className="   w-full h-60"><img src= {assets.Room3}/> </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Semi Deluxe ROom</h3>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-amber-600">₹3000</span>
                  <span className="text-gray-500 ml-2">/ night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Two separate bedrooms</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Kitchenette</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free accommodation for kids</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Private dining area</span>
                  </li>
                </ul>
                <button onClick={()=>{navigate(`/rooms/67f7647c197ac559e4089b96`)}} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
             <div className="   w-full h-60"><img src= {assets.DiningRoom1}/> </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Party Hall</h3>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-amber-600">₹6,000</span>
                  <span className="text-gray-500 ml-2">/ night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Private pool</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Panoramic ocean views</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Butler service</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Personalized island tours</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Information</h3>
            <p className="text-gray-600 mb-4">
            Booking terms=50% advance payment is required before booking the room.

Cancellation policy-=If you cancel your booked room within seven days, you will only get a refund of 50% of the advance amount you paid. After seven days, the advance amount will not be refunded.
            </p>
            <p className="text-gray-600">
              You can also book a room by visiting in person at the hotel reception but, we advise booking a hotel room in Baratang Island prior to your arrival to avoid last-minute hassles.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-teal-800 mb-1 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Island Paradise Awaits</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A trip to Baratang is a stunning and exhilarating experience which one must visit during a lifetime. Let Coral Creek Resort be your perfect island sanctuary.
          </p>
          <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-full shadow-xl transition duration-300">
            Plan Your Getaway Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutCoralCreek;