import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// Use environment variable for base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    hotelName: '',
    roomType: '',
    pricePerNight: 0,
    location: '',
    city: '',
    features: [],
    isAvailable: false,
  });
  const [featureInput, setFeatureInput] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Image management states
  const [currentImages, setCurrentImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [replacementImage, setReplacementImage] = useState(null);
  const [replacingIndex, setReplacingIndex] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/rooms`);
      setRooms(res.data.rooms);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
      setError('Failed to load rooms. Please try again later.');
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
    setCurrentImages(room.images || []);
    setRemovedImages([]);
    setReplacementImage(null);
    setReplacingIndex(null);
    setFeatureInput('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;
    
    if (type === 'checkbox') {
      val = checked;
    } else if (type === 'number') {
      val = Number(value);
    } else if (type === 'radio') {
      val = value === 'true';
    }
    
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
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

  const handleRemoveImage = (img) => {
    // Add to removed images list
    setRemovedImages([...removedImages, img]);
  };

  const handleRestoreImage = (img) => {
    // Remove from removed images list
    setRemovedImages(removedImages.filter(removedImg => removedImg !== img));
  };

  const triggerReplaceImage = (index) => {
    setReplacingIndex(index);
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleReplaceFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setReplacementImage(e.target.files[0]);
      setError('');
    }
  };

  const handleReplaceImage = async (roomId, index) => {
    if (!replacementImage) {
      setError('Please select an image to replace');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const formData = new FormData();
      formData.append('replacementImage', replacementImage);
      formData.append('replaceIndex', index);

      // Send replacement request
      const res = await axios.put(`${BASE_URL}/api/rooms/${roomId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update local state with the new image
      const updatedRoom = res.data;
      const newImagePath = updatedRoom.images[index];
      
      setCurrentImages(prev => {
        const updated = [...prev];
        updated[index] = newImagePath;
        return updated;
      });
      
      // Remove the image from removedImages if it was there
      const replacedImage = currentImages[index];
      setRemovedImages(removedImages.filter(img => img !== replacedImage));
      
      setSuccessMessage('Image replaced successfully!');
      setReplacementImage(null);
      setReplacingIndex(null);
    } catch (err) {
      console.error("Image replacement failed:", err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to replace image. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getCurrentImageCount = () => {
    return currentImages.filter(img => !removedImages.includes(img)).length;
  };
      
  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');

      // Filter out invalid images that might be already removed
      const validRemovedImages = removedImages.filter(img => 
        currentImages.includes(img)
      );

      // Validate image count
      if (getCurrentImageCount() !== 4) {
        setError(`Exactly 4 images are required. You have ${getCurrentImageCount()}`);
        setSaving(false);
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append non-image fields
      formDataToSend.append('hotelName', formData.hotelName);
      formDataToSend.append('roomType', formData.roomType);
      formDataToSend.append('pricePerNight', formData.pricePerNight);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('isAvailable', formData.isAvailable);
      formDataToSend.append('features', formData.features.join(','));

      // Append only valid removed images
      validRemovedImages.forEach(img => {
        formDataToSend.append('removedImages', img);
      });

      // Send update request
      await axios.put(`${BASE_URL}/api/rooms/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Room updated successfully!');
      setTimeout(() => {
        setEditingRoom(null);
        fetchRooms();
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to update room. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Rooms</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {rooms.map(room => (
          <div
            key={room._id}
            className="border p-4 rounded-md shadow bg-white transition-all duration-300 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-700">Room Images</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.images?.slice(0, 4).map((img, idx) => (
                      <img 
                        key={idx} 
                        src={`${BASE_URL}${img}?t=${Date.now()}`} 
                        alt={`Room ${idx}`}
                        className="w-16 h-16 object-cover rounded border"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {room.images?.length || 0} images
                  </p>
                </div>
              </div>
              
              <div className="md:flex-1">
                {editingRoom === room._id ? (
                  <>
                    {successMessage && (
                      <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">
                        {successMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Hotel Name</label>
                        <input
                          type="text"
                          name="hotelName"
                          value={formData.hotelName}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-1">Room Type</label>
                        <input
                          type="text"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-1">Price Per Night (₹)</label>
                        <input
                          type="number"
                          name="pricePerNight"
                          value={formData.pricePerNight}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Features</label>
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            placeholder="Add feature (e.g. WiFi, AC)"
                            className="flex-1 border p-2 rounded focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleFeatureAdd()}
                          />
                          <button
                            onClick={handleFeatureAdd}
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                            type="button"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map((feature, index) => (
                            <div 
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                            >
                              <span>{feature}</span>
                              <button
                                onClick={() => handleFeatureRemove(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                                type="button"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Availability</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="isAvailable"
                              value="true"
                              checked={formData.isAvailable === true}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <span>Available</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="isAvailable"
                              value="false"
                              checked={formData.isAvailable === false}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <span>Not Available</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 pt-4 border-t">
                        <h3 className="font-medium mb-3 text-lg">Manage Images</h3>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <span className="font-medium">Total Images: </span>
                              <span className={`font-bold ${getCurrentImageCount() === 4 ? 'text-green-600' : 'text-red-600'}`}>
                                {getCurrentImageCount()} / 4
                              </span>
                              {getCurrentImageCount() !== 4 && (
                                <span className="text-red-600 ml-2">(Exactly 4 required)</span>
                              )}
                              <p className="text-sm text-gray-500 mt-1">
                                Click "Replace" to change an image at its current position
                              </p>
                            </div>
                            
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleReplaceFileChange}
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                          
                          {/* Current images display */}
                          {currentImages.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-medium mb-3 flex items-center">
                                Existing Images
                                {removedImages.length > 0 && (
                                  <span className="text-sm text-red-600 ml-2">
                                    ({removedImages.length} marked for removal)
                                  </span>
                                )}
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {currentImages.map((img, index) => {
                                  const isRemoved = removedImages.includes(img);
                                  return (
                                    <div key={index} className="relative group border rounded-lg overflow-hidden p-2 bg-gray-50">
                                      <div className="flex flex-col items-center">
                                        <div className="relative">
                                          <img 
                                            src={`${BASE_URL}${img}`}
                                            alt={`Room ${index}`}
                                            className={`w-full h-24 `}
                                          />
                                         
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                          <button
                                            onClick={() => triggerReplaceImage(index)}
                                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                            disabled={isRemoved}
                                          >
                                            Replace
                                          </button>
                                        </div>
                                      </div>
                                      
                                      {replacingIndex === index && (
                                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                          <p className="text-sm text-yellow-700 mb-2">
                                            Image selected for replacement
                                          </p>
                                          <div className="flex gap-2">
                                            <button
                                              onClick={() => handleReplaceImage(room._id, index)}
                                              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                              disabled={saving}
                                            >
                                              {saving ? 'Replacing...' : 'Confirm Replace'}
                                            </button>
                                            <button
                                              onClick={() => {
                                                setReplacementImage(null);
                                                setReplacingIndex(null);
                                              }}
                                              className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {getCurrentImageCount() === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              No images selected. Please restore or replace images to have exactly 4 images.
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 flex gap-4 pt-4">
                        <button
                          onClick={() => handleUpdate(room._id)}
                          disabled={saving || getCurrentImageCount() < 4}
                          className={`px-4 py-2 rounded text-white ${
                            saving || getCurrentImageCount() < 4
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {saving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => setEditingRoom(null)}
                          disabled={saving}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(room)}
                      className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition-colors"
                    >
                      Edit Room Details
                    </button>
                    
                    <div className="space-y-2">
                      <p><strong className="text-gray-700">Hotel:</strong> {room.hotelName}</p>
                      <p><strong className="text-gray-700">Type:</strong> {room.roomType}</p>
                      <p><strong className="text-gray-700">Price:</strong> ₹{room.pricePerNight?.toLocaleString()}</p>
                      <p><strong className="text-gray-700">Location:</strong> {room.location}</p>
                      <p><strong className="text-gray-700">City:</strong> {room.city}</p>
                      <p>
                        <strong className="text-gray-700">Features:</strong> 
                        {room.features?.length > 0 
                          ? room.features.join(', ') 
                          : ' No features listed'}
                      </p>
                      <p>
                        <strong className="text-gray-700">Available:</strong> 
                        <span className={room.isAvailable ? 'text-green-600 font-medium ml-1' : 'text-red-600 font-medium ml-1'}>
                          {room.isAvailable ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                  </>
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