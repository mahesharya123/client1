import React from 'react';
import MenuCategory from '../Components/MenuCategory';
import { Link } from 'react-router-dom';

const RestaurantMenu = () => {
  const menuData = [
    {
      title: "Hot Drinks",
      items: [
        { name: "Milk Tea", price: "Rs. 80/-" },
        { name: "Black Tea", price: "Rs. 60/-" },
        { name: "Milk Coffee", price: "Rs. 90/-" },
        { name: "Black Coffee", price: "Rs. 70/-" },
        { name: "Ginger/Lemon/Honey Tea", price: "Rs. 100/-" },
        { name: "Hot Milk", price: "Rs. 80/-" },
        { name: "Masala Tea", price: "Rs. 90/-" }
      ]
    },
    {
      title: "Cold Drinks & Juices",
      items: [
        { name: "Lemon Juice", price: "Rs. 80/-" },
        { name: "Lemon Soda", price: "Rs. 70/-" },
        { name: "Banana Milk Shake", price: "Rs. 100/-" },
        { name: "Plain Lassi", price: "Rs. 80/-" },
        { name: "Sweet Lassi", price: "Rs. 80/-" },
        { name: "Sharja Shake", price: "Rs. 145/-" },
        { name: "Water (1 ltr)", price: "Rs. 50/-" },
        { name: "Banana Coconut Shake", price: "Rs. 120/-" },
        { name: "Apple Juice", price: "Rs. 120/-" },
        { name: "Cold Coffee", price: "Rs. 100/-" },
        { name: "Curd", price: "Rs. 80/-" },
        { name: "Coke", price: "Rs. 70/-" }
      ]
    },
    {
      title: "Breakfast & Snacks",
      items: [
        { name: "Plain Toast", price: "Rs. 50/-" },
        { name: "Butter Jam Toast", price: "Rs. 70/-" },
        { name: "Cheese Toast", price: "Rs. 90/-" },
        { name: "Veg Cheese Sandwich", price: "Rs. 110/-" },
        { name: "Veg Egg Cheese Sandwich", price: "Rs. 140/-" },
        { name: "Chicken Sandwich", price: "Rs. 150/-" },
        { name: "Veg Omlet Sandwich", price: "Rs. 110/-" },
        { name: "Veg Sandwich", price: "Rs. 90/-" },
        { name: "Boiled Egg (2 pcs)", price: "Rs. 70/-" },
        { name: "Plain Omlet", price: "Rs. 80/-" },
        { name: "Veg Cheese Omlet", price: "Rs. 120/-" },
        { name: "Bread Omlet", price: "Rs. 100/-" },
        { name: "Puri Bhaji", price: "Rs. 120/-" }
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Bindi Masala", price: "Rs. 160/-" },
        { name: "Mixed Masala", price: "Rs. 180/-" },
        { name: "Channa Masala", price: "Rs. 170/-" },
        { name: "Palak Paneer", price: "Rs. 190/-" },
        { name: "Paneer Butter Masala", price: "Rs. 250/-" },
        { name: "Boiled Vegetables", price: "Rs. 120/-" },
        { name: "Aloo Jeera", price: "Rs. 150/-" },
        { name: "Brinjal Fry", price: "Rs. 130/-" },
        { name: "Brinjal Bhartha", price: "Rs. 150/-" },
        { name: "Brinjal Masala", price: "Rs. 160/-" },
        { name: "Chilli Paneer", price: "Rs. 220/-" },
        { name: "Veg Kofta", price: "Rs. 200/-" },
        { name: "Mutter Paneer", price: "Rs. 220/-" },
        { name: "Aloo Gobi", price: "Rs. 250/-" },
        { name: "Dal Tadka", price: "Rs. 140/-" },
        { name: "Plain Dal", price: "Rs. 120/-" },
        { name: "Aloo Mutter", price: "Rs. 180/-" }
      ]
    }
  ];

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