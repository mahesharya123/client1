import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ title: '', items: [] });
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/menu');
      setMenuData(res.data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setForm({ ...menuData[index] });
  };

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleItemChange = (idx, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[idx][field] = value;
    setForm({ ...form, items: updatedItems });
  };

  const handleItemRemove = (idx) => {
    const updatedItems = [...form.items];
    updatedItems.splice(idx, 1);
    setForm({ ...form, items: updatedItems });
  };

  const handleItemAdd = () => {
    if (newItem.name && newItem.price) {
      setForm({ ...form, items: [...form.items, newItem] });
      setNewItem({ name: '', price: '' });
    }
  };

  const handleSave = async () => {
    try {
      const id = menuData[editingIndex]._id;
      await axios.put(`http://localhost:8000/api/menu/${id}`, form);
      setEditingIndex(null);
      fetchMenu();
    } catch (err) {
      console.error('Failed to update menu:', err);
    }
  };

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

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-12">
        {menuData.map((category, index) => (
          <div key={index} className="border p-4 rounded shadow">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleTitleChange}
                  className="border px-2 py-1 rounded mb-2 w-full"
                  placeholder="Course Title"
                />
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(i, 'name', e.target.value)}
                      className="border px-2 py-1 rounded w-1/2"
                      placeholder="Dish Name"
                    />
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => handleItemChange(i, 'price', e.target.value)}
                      className="border px-2 py-1 rounded w-1/3"
                      placeholder="Price"
                    />
                    <button onClick={() => handleItemRemove(i)} className="text-red-500">Remove</button>
                  </div>
                ))}
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border px-2 py-1 rounded w-1/2"
                    placeholder="New Dish Name"
                  />
                  <input
                    type="text"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border px-2 py-1 rounded w-1/3"
                    placeholder="New Price"
                  />
                  <button onClick={handleItemAdd} className="bg-blue-500 text-white px-3 rounded">Add</button>
                </div>
                <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-amber-700 mb-3">{category.title}</h2>
                <ul className="space-y-1">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleEditClick(index)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">
                  Edit Section
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMenu;
