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


function App() {
  const [count, setCount] = useState(0)
  const isowner = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isowner && <Navbar/>}
      <div  className='min-h-[70v]'>
        <Routes >
          <Route path='/' element={<Home/>} /> 
             <Route path='/rooms' element={<AllRoom/>} /> 
            <Route path='/Contact' element={<ContactUs/>}/>
             <Route path='/About' element={<AboutCoralCreek/>}/>
               <Route path='/Gallery' element={<GalleryPage/>}/>
              <Route path='/rooms/:id' element={<SingleRoomBooking/>}/>
              <Route path='/Services' element={<Services1/>}/>
               <Route path="/restaurant-menu" element={<RestaurantMenu />} />
          </Routes>

      </div>
      <Footer/>
    </div>
  )
}

export default App
