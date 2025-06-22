import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaWineGlassAlt } from 'react-icons/fa';

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [location]);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <FaWineGlassAlt size={32} className="text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Coral Creek Admin</h1>
      </div>

      {/* User Icon */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="bg-blue-600 text-white w-9 h-9 rounded-full font-semibold"
          >
            {user.name?.charAt(0).toUpperCase()}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/admin/dashboard');
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                My Dashboard
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/account');
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Manage Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default AdminNavbar;
