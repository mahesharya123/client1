import React from 'react';
import { FaBed, FaUtensils, FaGlassCheers } from 'react-icons/fa';

const services = [
  {
    title: 'Rooms',
    icon: <FaBed className="text-4xl text-blue-600" />,
  },
  {
    title: 'Restaurant',
    icon: <FaUtensils className="text-4xl text-green-600" />,
  },
  {
    title: 'Party Hall',
    icon: <FaGlassCheers className="text-4xl text-purple-600" />,
  },
];

const Services = () => {
  return (
    <>
    <div id="services" className=" py-16 px-6 md:px-16 lg:px-24 text-center" style={{backgroundImage: `linear-gradient(to right,rgb(168, 168, 211),rgb(138, 141, 147))`}}>
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-xl duration-300"
          >
            {service.icon}
            <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
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
    </>
  );
};

export default Services;
