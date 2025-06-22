// components/BookingSummaryModal.jsx
import React from 'react';

const BookingSummaryModal = ({ isOpen, onClose, totalPrice, onFullPayment, onHalfPayment }) => {
  if (!isOpen) return null;

  const gst = totalPrice * 0.18; // 18% GST
  const razorpayFee = (totalPrice + gst) * 0.02; // 2% of total after GST
  const grandTotal = totalPrice + gst + razorpayFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[90%] md:w-[450px] shadow-2xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Booking Summary</h2>

        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Room Price</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Razorpay Charges (2%)</span>
            <span>₹{razorpayFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-black">
            <span>Total Payable</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <button
            onClick={() => onFullPayment(grandTotal)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full"
          >
            Pay Full Amount
          </button>
          <button
            onClick={() => onHalfPayment(grandTotal / 2)}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Pay Half Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryModal;
