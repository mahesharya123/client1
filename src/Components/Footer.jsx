import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router'

const Footer = () => {
  return (
    
        
             <div className=' text-gray-500/80 border border-yellow-200 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <img src={assets.siteLogo} alt="logo" className='mb-4 h-12 md:h-16 invert' />
                    <p className='text-sm'>
                       Discover the world's most extraordinary places to stay, from boutique hotels
                       to luxry villas and private islands.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                       <Link to={`https://www.instagram.com/_coral__creek?igsh=MXMza2V4dmZjNmJ4MQ==`}> <img src={assets.instagramIcon} alt='instagram-icon' className='w-6'/></Link>
                        {/* Facebook */}
                       <Link to={`https://www.facebook.com/profile.php?id=100083330514889`}>  <img src={assets.facebookIcon} alt='facebook-icon' className='w-6'/></Link>
                        {/* Twitter */}
                         <img src={assets.twitterIcon} alt='twitter-icon' className='w-6'/>
                        {/* LinkedIn */}
                         <img src={assets.linkendinIcon} alt='linkedin-icon' className='w-6'/>
                    </div>
                </div>

                <div>
                    <p className= 'font-playfair text-lg text-gray-800'>COMPANY</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="/">Services</a></li>
                        <li><a href="#">Rooms</a></li>
                        <li><a href="#">Restaurent</a></li>
                    </ul>
                </div>

                <div>
                    <p className='font-playfair text-lg text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Call Us</a></li>
                        <li><a href="#">Ammenties</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='font-playfair text-lg text-gray-800'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white rounded-l
                         border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                        <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                            {/* Arrow icon */}
                           <img src={assets.arrowIcon} alt='arrow-icon' className='w-3.5 invert'/>
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} CoralCreek. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
        
    
  )
}

export default Footer