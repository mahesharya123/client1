import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    roomType: '',
    pricePerNight: '',
    location: '',
    city: '',
    features: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Popup state
  const [popup, setPopup] = useState({ message: '', type: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(prevImages => prevImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach(img => data.append('images', img));

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://coralcreek-backend-production.up.railway.app/api/rooms', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      // ✅ Show success message
      setPopup({ message: 'Room created successfully!', type: 'success' });

      // ✅ Clear form
      setFormData({
        hotelName: '',
        roomType: '',
        pricePerNight: '',
        location: '',
        city: '',
        features: '',
      });
      setImages([]);

    } catch (err) {
      console.error(err);
      setPopup({ message: 'Room creation failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);

      // ✅ Hide popup after 3 seconds
      setTimeout(() => setPopup({ message: '', type: '' }), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-20 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Room</h2>

      {/* ✅ Popup Message */}
      {popup.message && (
        <div
          className={`absolute top-2 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-md text-white transition duration-300 ${
            popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {popup.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
    
        <div>
          <label className="block font-medium mb-1">Hotel Name</label>
          <input
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Room Type</label>
          <input
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price Per Night (₹)</label>
          <input
            name="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Features (comma separated)</label>
          <input
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Room Images (multiple)</label>
          <input
            type="file"
            multiple
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Image Previews with Remove Option */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative border rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Creating...' : 'Create Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
