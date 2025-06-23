import React, { useEffect, useState } from 'react';
import MenuCategory from '../Components/MenuCategory';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('https://coralcreek-backend.onrender.com/api/menu');
        setMenuData(res.data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setError('Failed to load menu. Please try again later.');
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          </svg>
          Restaurant Menu
        </h1>
        <p className="text-xl text-gray-600">
          Delicious dishes crafted with passion and fresh ingredients
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {error && (
          <p className="text-center text-red-600 mb-4">{error}</p>
        )}

        {menuData.length === 0 && !error && (
          <p className="text-center text-gray-500">Loading menu...</p>
        )}

        {menuData.map((category, index) => (
          <MenuCategory 
            key={index} 
            title={category.title} 
            items={category.items} 
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/services" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Services
        </Link>
      </div>
    </div>
  );
};

export default RestaurantMenu;
