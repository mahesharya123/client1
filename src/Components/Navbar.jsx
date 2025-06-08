import React from 'react'
import { useState,useEffect } from 'react';
import {assets} from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { href, useLocation, useNavigate } from 'react-router';
import { FaWineGlassAlt } from 'react-icons/fa';
import { FaWineGlass } from 'react-icons/fa';

const BookIcon = ()=>(
     <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)
const Navbar = () => {
  const navLinks = [
        { name: 'Home', path: '/' },
        { 
            name: 'Services', path:'/services'
            
        },
        { name: 'Contact', path: '/Contact' },
        { name: 'About', path: '/About' },
    ];

   

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.pathname !=='/'){
            setIsScrolled(true);
            return;
        }
        else{
            setIsScrolled(false);
        }
        setIsScrolled(prev=>location.pathname !=='/' ? true :prev);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        
            
            <nav className={`fixed top-0 left-0  w-full flex items-center bg-black justify-between px-4 md:px text lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <a href="/" className="flex items-center  ">
                 
                       <FaWineGlassAlt size={40} color={` ${isScrolled ? "black" : "white"}`} title="Wine Glass Alt" />
                       <h1  style={{fontSize:'1.8em'}} className={` ${isScrolled ? "text-black" : "text-white"}`} >Coral Creek</h1>
                       {/* <FaWineGlass size={40} color={` ${isScrolled ? "black" : "white"}`} title="Wine Glass" />*/}

                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={()=>navigate('/Gallery')}>
                       Gallery
                    </button>
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <svg className={`h-6 w-6 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  
                       
                    </svg>
                    { user ?
                     (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings ' labelIcon={<BookIcon/>} onClick={()=>navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                     </UserButton>):
                     (  <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                        Login
                    </button>)
                }
                  
                </div>

                {/* Mobile Menu Button */}
               
                <div className="flex items-center gap-3 md:hidden">
                     {user && <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings ' labelIcon={<BookIcon/>} onClick={()=>navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                     </UserButton>}
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} style={{color:'white'}} className={`h-6 w-6 cursor-pointer  ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                   {
                      <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={()=>navigate('/Gallery')}>
                        Gallery
                    </button>
                     }

                    {!user && <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}
                </div>
            </nav>
        
    );
   
}

export default Navbar
