import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaWineGlassAlt } from 'react-icons/fa';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        
        !dropdownRef.current.contains(event.target) &&
        !userButtonRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      if (
        navOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !dropdownRef.current?.contains(event.target) &&
        !userButtonRef.current?.contains(event.target)
      ) {
        setNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [navOpen]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [location]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 10);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleNav = () => setNavOpen(prev => !prev);
  const toggleDropdown = () => setShowDropdown(prev => !prev );
  const closeAllMenus = () => {
    setNavOpen(false);
     setShowDropdown(prev => !prev );
  
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
   
    navigate('/');
  };

  const handleDropdownItemClick = () => {
    setTimeout(() => {
      closeAllMenus();
    }, 100);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <FaWineGlassAlt size={40} className="text-black" title="Wine Glass Alt" />
          <h1 style={{ fontSize: '1.8em' }} className="text-black">Coral Creek</h1>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 relative overflow-visible">
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/Services">Services</Link>
          <Link to="/About">About</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to="/Contact">Contact</Link>
         {user ? (
  <div className="relative">
    <button
      ref={userButtonRef}
      onClick={toggleDropdown}
      className="bg-black text-white w-9 h-9 rounded-full font-semibold"
    >
      {user.name?.charAt(0).toUpperCase()}
    </button>

  {showDropdown && (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md z-[9999]"
      >
        {user.isAdmin ? (
          <>
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownItemClick();
              }}
            >
              My Dashboard
            </Link>
            <Link
              to="/account"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownItemClick();
              }}
            >
              Manage Account
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/mybookings"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownItemClick();
              }}
            >
              My Bookings
            </Link>
            <Link
              to="/account"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownItemClick();
              }}
            >
              Manage Account
            </Link>
          </>
        )}
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
  <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">
    Login
  </Link>
)}


         </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <button
              ref={userButtonRef}
              onClick={toggleDropdown}
              className="bg-black text-white w-9 h-9 rounded-full font-semibold"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Login</Link>
          )}
          <button onClick={toggleNav}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showDropdown && user && (
        <div ref={dropdownRef} className="md:hidden bg-white border-t px-4 py-3 z-50">
          {user.isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="block py-1" onClick={handleDropdownItemClick}>
                My Dashboard
              </Link>
              <Link to="/account" className="block py-1" onClick={handleDropdownItemClick}>
                Manage Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/mybookings" className="block py-1" onClick={handleDropdownItemClick}>
                My Bookings
              </Link>
              <Link to="/account" className="block py-1" onClick={handleDropdownItemClick}>
                Manage Account
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="block text-red-600 py-1">
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {navOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white px-4 pt-4 pb-6 space-y-2 border-t z-40">
          <Link to="/" onClick={handleDropdownItemClick} className="block">Home</Link>
          <Link to="/rooms" onClick={handleDropdownItemClick} className="block">Rooms</Link>
          <Link to="/Services" onClick={handleDropdownItemClick} className="block">Services</Link>
          <Link to="/About" onClick={handleDropdownItemClick} className="block">About</Link>
          <Link to="/Gallery" onClick={handleDropdownItemClick} className="block">Gallery</Link>
          <Link to="/Contact" onClick={handleDropdownItemClick} className="block">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
