import { useState } from 'react'
import { Routes, useLocation } from 'react-router'
import Navbar from './Components/Navbar'
import { Route } from 'react-router';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AllRoom from './Pages/AllRoom';

import ContactUs from './Pages/ContactUs';
import AboutCoralCreek from './Pages/AboutCoralCreek';
import GalleryPage from './Pages/Gallery';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MyBookings from './Pages/MyBooking';

import Services1 from './Pages/Services1';
import RestaurantMenu from './Pages/RestaurantMenu';
import RoomDetails from './Pages/RoomDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddRoom from './Pages/AddRoom';
import AdminLayout from './Pages/AdminLayout';
import Dashboard from './Pages/admin/Dashboard';

import ListRoom from './Pages/ListRoom';
import AddMenu from './Pages/AddMenu';
import ListMenu from './Pages/ListMenu';
import Account from './Pages/Account';
const user = JSON.parse(localStorage.getItem('user'));

function App() {
 const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user?.isAdmin;


   return (
    <div>
      {/* Only show Navbar if NOT in admin routes */}
      { <Navbar user={user} />}
      
      <div className="min-h-[70vh]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<AllRoom />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/About" element={<AboutCoralCreek />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/Services" element={<Services1 />} />
          <Route path="/mybookings" element={<MyBookings />} />
           <Route path="/account" element={<Account />} />
          <Route path="/restaurant-menu" element={<RestaurantMenu />} />

          {/* Admin Routes with Layout */}
          {user?.isAdmin && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="add-menu" element={<AddMenu />} />
              <Route path="list-room" element={<ListRoom/>} />
              <Route path="list-menu" element={<ListMenu />} />
            </Route>
          )}
        </Routes>
      </div>

      {/* Only show Footer if NOT in admin routes */}
      {!isAdmin&& <Footer />}
    </div>
  );
}

export default App
