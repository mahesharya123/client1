import React from 'react';

const MenuCategory = ({ title, items }) => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-amber-500 pb-2 mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">{item.name}</span>
            </div>
            <span className="text-amber-600 font-bold">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;