// components/SupportModal.jsx
import React from 'react';

const SupportModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default SupportModal;
