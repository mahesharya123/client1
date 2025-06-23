import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({});
  const [featureInput, setFeatureInput] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchRooms = async () => {
    try {
      const res = await axios.get('https://coralcreek-backend.onrender.com/api/rooms');
      setRooms(res.data.rooms);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleEditClick = (room) => {
    setError('');
    setSuccessMessage('');
    setEditingRoom(room._id);
    setFormData({
      hotelName: room.hotelName || '',
      roomType: room.roomType || '',
      pricePerNight: room.pricePerNight || 0,
      location: room.location || '',
      city: room.city || '',
      features: room.features || [],
      isAvailable: room.isAvailable || false,
    });
    setFeatureInput('');
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === 'radio') {
      val = value === 'true';
    } else if (type === 'number') {
      val = Number(value);
    }
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (index) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData({ ...formData, features: updated });
  };

  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      setSuccessMessage('');

      await axios.put(`https://coralcreek-backend.onrender.com/api/rooms/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Room updated successfully!');
      setEditingRoom(null);
      fetchRooms();
    } catch (err) {
      console.error("Failed to save changes:", err.response?.data || err.message);
      setError('Failed to update room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Rooms</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {rooms.map(room => (
          <div
            key={room._id}
            className="border p-4 rounded-md shadow bg-white"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:flex-1">
                {successMessage && editingRoom === room._id && (
                  <div className="mb-2 text-green-600 font-medium">
                    {successMessage}
                  </div>
                )}

                <button
                  onClick={() => handleEditClick(room)}
                  className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                >
                  Edit Room Details
                </button>

                {editingRoom === room._id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="hotelName"
                      value={formData.hotelName}
                      onChange={handleInputChange}
                      placeholder="Hotel Name"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      placeholder="Room Type"
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      name="pricePerNight"
                      value={formData.pricePerNight}
                      onChange={handleInputChange}
                      placeholder="Price Per Night"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="border p-2 rounded"
                    />

                    <div className="col-span-full">
                      <label className="font-medium">Features:</label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="Add feature"
                          className="border p-2 rounded"
                        />
                        <button
                          onClick={handleFeatureAdd}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="list-disc list-inside">
                        {formData.features.map((feature, index) => (
                          <li key={index} className="flex justify-between items-center">
                            {feature}
                            <button
                              onClick={() => handleFeatureRemove(index)}
                              className="text-red-500 ml-2"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="font-medium">Is Available:</label>
                      <label>
                        <input
                          type="radio"
                          name="isAvailable"
                          value="true"
                          checked={formData.isAvailable === true || formData.isAvailable === 'true'}
                          onChange={handleInputChange}
                        />{' '}Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="isAvailable"
                          value="false"
                          checked={formData.isAvailable === false || formData.isAvailable === 'false'}
                          onChange={handleInputChange}
                        />{' '}No
                      </label>
                    </div>

                    <div className="col-span-full flex gap-4">
                      <button
                        onClick={() => handleUpdate(room._id)}
                        disabled={saving}
                        className={`px-4 py-2 rounded text-white ${saving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingRoom(null)}
                        disabled={saving}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p><strong>Hotel:</strong> {room.hotelName}</p>
                    <p><strong>Type:</strong> {room.roomType}</p>
                    <p><strong>Price:</strong> ₹{room.pricePerNight}</p>
                    <p><strong>Location:</strong> {room.location}</p>
                    <p><strong>City:</strong> {room.city}</p>
                    <p><strong>Features:</strong> {room.features ? room.features.join(',') : 'N/A'}</p>
                    <p><strong>Available:</strong> {room.isAvailable ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoom;
