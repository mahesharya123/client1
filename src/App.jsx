import { useState } from 'react'
import { Routes, useLocation } from 'react-router'
import Navbar from './Components/Navbar'
import { Route } from 'react-router';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AllRoom from './Pages/AllRoom';
import Services from './Components/Services';
import ContactUs from './Pages/ContactUs';
import AboutCoralCreek from './Pages/AboutCoralCreek';
import GalleryPage from './Pages/Gallery';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import SingleRoomBooking from './Pages/SingleRoomBooking';
import Services1 from './Pages/Services1';
import RestaurantMenu from './Pages/RestaurantMenu';
import RoomDetails from './Pages/RoomDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddRoom from './Pages/AddRoom';

const user = JSON.parse(localStorage.getItem('user'));

function App() {
 const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user?.isAdmin;


  return (
    <div>
      { <Navbar user={user}/>}
      <div  className='min-h-[70v]'>
        <Routes >
          <Route path='/' element={<Home/>} /> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
             <Route path='/rooms' element={<AllRoom/>} /> 
            <Route path='/Contact' element={<ContactUs/>}/>
             <Route path='/About' element={<AboutCoralCreek/>}/>
               <Route path='/Gallery' element={<GalleryPage/>}/>
              <Route path='/rooms/:id' element={<RoomDetails/>}/>
              <Route path='/Services' element={<Services1/>}/>
               <Route path="/restaurant-menu" element={<RestaurantMenu />} />
               {/* Admin Only Route */}
               {isAdmin && <Route path='/AddRoom' element={<AddRoom />} />}
          </Routes>

      </div>
      <Footer/>
    </div>
  )
}

export default App
