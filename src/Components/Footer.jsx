import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FaWineGlassAlt } from 'react-icons/fa';
import SupportModal from './SupportModal';

const Footer = () => {
  const [modalData, setModalData] = useState({ open: false, title: '', content: '' });

  const openModal = (title, content) => {
    setModalData({ open: true, title, content });
  };

  const closeModal = () => {
    setModalData({ open: false, title: '', content: '' });
  };

  return (
    <div className='text-gray-500/80 border border-yellow-200 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Mobile layout */}
      <div className='md:hidden'>
        {/* Logo row */}
        <div className='mb-8'>
          <a href="/" className="flex items-center">
            <FaWineGlassAlt size={40} className='text-black' />
            <h1 style={{ fontSize: '1.8em' }} className='text-black ml-2'>Coral Creek</h1>
          </a>
          <p className='text-sm mt-2'>
            Discover the world's most extraordinary places to stay, from boutique hotels
            to luxury villas and private islands.
          </p>
        </div>
        
        {/* Company & Support in 2 columns */}
        <div className='grid grid-cols-2 gap-8 mb-8'>
          {/* Company */}
          <div>
            <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
            <ul className='mt-3 flex flex-col gap-2 text-sm'>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/services1">Services</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/restaurant-menu">Restaurant</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
            <ul className='mt-3 flex flex-col gap-2 text-sm'>
              <li><button onClick={() => openModal("Help Center", "You can reach out 24x7 for any booking help.")}>Help Center</button></li>
              <li><button onClick={() => openModal("Safety Information", "We follow all safety guidelines for COVID-19 and hygiene.")}>Safety Information</button></li>
              <li><button onClick={() => openModal("Cancellation Options", "You can cancel up to 48 hours before check-in.")}>Cancellation Options</button></li>
              <li><button onClick={() => openModal("Call Us", "For any urgent help, call us at +91 9474206075.")}>Call Us</button></li>
              <li><button onClick={() => openModal("Amenities", "We offer AC, WiFi, parking, and room service.")}>Amenities</button></li>
            </ul>
          </div>
        </div>
        
        {/* Social icons row */}
        <div className='mb-8'>
          <p className='font-playfair text-lg text-gray-800 mb-4'>SOCIAL MEDIA</p>
          <div className='flex justify-center gap-6'>
            <a href="https://www.instagram.com/_coral__creek?igsh=MXMza2V4dmZjNmJ4MQ==" target='_blank' rel='noreferrer'>
              <img src={assets.instagramIcon} alt='Instagram' className='w-6' />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083330514889" target='_blank' rel='noreferrer'>
              <img src={assets.facebookIcon} alt='Facebook' className='w-6' />
            </a>
            <img src={assets.twitterIcon} alt='Twitter' className='w-6' />
            <img src={assets.linkendinIcon} alt='LinkedIn' className='w-6' />
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className='hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8'>
        {/* Column 1: Brand Info */}
        <div className='max-w-80'>
          <a href="/" className="flex items-center">
            <FaWineGlassAlt size={40} className='text-black' />
            <h1 style={{ fontSize: '1.8em' }} className='text-black ml-2'>Coral Creek</h1>
          </a>
          <p className='text-sm mt-2'>
            Discover the world's most extraordinary places to stay, from boutique hotels
            to luxury villas and private islands.
          </p>
        </div>

        {/* Column 2: Company */}
        <div>
          <p className='font-playfair text-lg text-gray-800'>COMPANY</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/services1">Services</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/restaurant-menu">Restaurant</Link></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            <li><button onClick={() => openModal("Help Center", "You can reach out 24x7 for any booking help.")}>Help Center</button></li>
            <li><button onClick={() => openModal("Safety Information", "We follow all safety guidelines for COVID-19 and hygiene.")}>Safety Information</button></li>
            <li><button onClick={() => openModal("Cancellation Options", "You can cancel up to 48 hours before check-in.")}>Cancellation Options</button></li>
            <li><button onClick={() => openModal("Call Us", "For any urgent help, call us at +91 9474206075.")}>Call Us</button></li>
            <li><button onClick={() => openModal("Amenities", "We offer AC, WiFi, parking, and room service.")}>Amenities</button></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <p className='font-playfair text-lg text-gray-800'>SOCIAL MEDIA</p>
          <ul className='mt-3 flex flex-col gap-3 text-sm'>
            <Link to={"https://www.instagram.com/_coral__creek?igsh=MXMza2V4dmZjNmJ4MQ=="} className='flex items-center gap-3'>
              <img src={assets.instagramIcon} alt='Instagram' className='w-5' />
              <a href="https://www.instagram.com/_coral__creek?igsh=MXMza2V4dmZjNmJ4MQ==" target='_blank' rel='noreferrer'>Instagram</a>
            </Link>
            <Link to={'https://www.facebook.com/profile.php?id=100083330514889'} className='flex items-center gap-3'>
              <img src={assets.facebookIcon} alt='Facebook' className='w-5' />
              <a href="https://www.facebook.com/profile.php?id=100083330514889" target='_blank' rel='noreferrer'>Facebook</a>
            </Link>
            <Link className='flex items-center gap-3'>
              <img src={assets.twitterIcon} alt='Twitter' className='w-5' />
              <span>Twitter</span>
            </Link>
            <Link className='flex items-center gap-3'>
              <img src={assets.linkendinIcon} alt='LinkedIn' className='w-5' />
              <span>LinkedIn</span>
            </Link>
          </ul>
        </div>
      </div>

      <hr className='border-gray-300 mt-8' />
      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm'>
        <p>© {new Date().getFullYear()} CoralCreek. All rights reserved.</p>
        <div className='flex items-center gap-2 text-gray-700 mt-2 md:mt-0'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 3.636a7 7 0 019.9 0 7 7 0 010 9.9l-4.95 4.95a.5.5 0 01-.707 0l-4.95-4.95a7 7 0 010-9.9zm4.95 1.414a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
          </svg>
          <p>1 Baratang, Great Trunk Rd, Port Blair, Andaman and Nicobar Islands 744210</p>
        </div>
      </div>

      {/* Modal */}
      <SupportModal
        isOpen={modalData.open}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
      />
    </div>
  );
};

export default Footer;