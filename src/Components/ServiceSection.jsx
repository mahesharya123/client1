import React from 'react';

const ServiceSection = ({ title, children, icon }) => {
  return (
    <section className="py-12">
      <div className="flex items-center mb-8">
        <div className="bg-amber-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default ServiceSection;