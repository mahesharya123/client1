import React from 'react';

const PopupCard = ({ isOpen, title, message, onClose, onConfirm, confirmText = "OK", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition"
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-black hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
