import React, { useState } from 'react';
import axios from 'axios';

const AddMenu = () => {
  const [title, setTitle] = useState('');
  const [dishes, setDishes] = useState([{ name: '', price: '' }]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleDishChange = (index, field, value) => {
    const updated = [...dishes];
    updated[index][field] = value;
    setDishes(updated);
  };

  const addDish = () => {
    setDishes([...dishes, { name: '', price: '' }]);
  };

  const removeDish = (index) => {
    const updated = dishes.filter((_, i) => i !== index);
    setDishes(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(false);
      setError('');
      await axios.post('https://coralcreek-backend-production.up.railway.app/api/menu', { title, items: dishes });
      setSuccess(true);
      setTitle('');
      setDishes([{ name: '', price: '' }]);
    } catch (err) {
      console.error(err);
      setError('Failed to add menu.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Menu Category</h2>

      {success && <div className="text-green-600 mb-4">Menu added successfully!</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title (e.g. Hot Drinks)"
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="space-y-4">
          {dishes.map((dish, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                placeholder="Dish Name"
                className="border p-2 rounded col-span-5"
                value={dish.name}
                onChange={(e) => handleDishChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                className="border p-2 rounded col-span-4"
                value={dish.price}
                onChange={(e) => handleDishChange(index, 'price', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeDish(index)}
                className="text-red-600 col-span-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addDish}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Add Another Dish
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Submit Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
