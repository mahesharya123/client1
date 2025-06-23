import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router';

const Hero = () => {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('Super Deluxe Room');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRoomChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setRooms(value);
    if (guests > value * 2) setGuests(value * 2);
  };

  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxGuests = rooms * 2;
    if (value > maxGuests) {
      alert("Please add more rooms to accommodate additional guests.");
    }
    setGuests(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Basic client-side validation
    const today = new Date().setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today) {
      setErrorMessage("Check-in date cannot be before today.");
      setLoading(false);
      return;
    }

    if (checkInDate >= checkOutDate) {
      setErrorMessage("Check-out must be after check-in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/availability/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomType }),
      });

      const data = await res.json();

      if (res.ok) {
        if (!data.isAvailable) {
          setErrorMessage(data.message || `${roomType} is not available.`);
        } else {
          navigate(
            `/rooms/${data.roomId}?roomType=${roomType}&rooms=${rooms}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`
          );
        }
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-start justify-center w-full px-6 md:px-16 lg:px-24 xl:px-32 text-white h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${assets.HeroImg})` }}
    >
      <p className="hidden md:flex bg-[#49B9FF] bg-opacity-50 px-18 py-2 w-70 text-white text-m rounded-full mt-20">
        Coral Creek Resort
      </p>
      <p className="bg-[#49B9FF] md:hidden bg-opacity-50 px-4 py-2 w-full text-center text-m rounded-full mt-20">
        Coral Creek Resort
      </p>

      <h1 className="font-playfair text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold max-w-xl mt-4">
        Experience the Perfect Blend of Comfort and Luxury
      </h1>

      <p className="max-w-[520px] mt-2 text-gray-900 text-sm sm:text-base">
        Step into a world of unmatched luxury and comfort at the most exclusive hotel and resort. Your journey begins now.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 rounded-lg px-6 py-2 mt-8 flex flex-col md:flex-row max-md:items-start gap-2 w-full max-w-4xl"
      >
        {/* Rooms */}
        <div className="flex flex-col ">
          <label htmlFor="rooms" className="text-sm font-medium">Rooms</label>
          <div className="flex md:hidden items-center gap-2 mt-1">
            <button type="button" className="bg-gray-200 px-3 py-1 rounded text-lg" onClick={() => setRooms(prev => Math.max(1, prev - 1))}>−</button>
            <span className="px-3">{rooms}</span>
            <button type="button" className="bg-gray-200 px-3 py-1 rounded text-lg" onClick={() => setRooms(prev => Math.min(10, prev + 1))}>+</button>
          </div>
          <input
            min={1}
            max={10}
            id="rooms"
            type="number"
            value={rooms}
            onChange={handleRoomChange}
            className="hidden md:block rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label htmlFor="guests" className="text-sm font-medium">Guests</label>
          <div className="flex md:hidden items-center gap-2 mt-1">
            <button type="button" className="bg-gray-200 px-3 py-1 rounded text-lg" onClick={() => setGuests(prev => Math.max(1, prev - 1))}>−</button>
            <span className="px-3">{guests}</span>
            <button type="button" className="bg-gray-200 px-3 py-1 rounded text-lg" onClick={() => {
              if (guests < rooms * 2) setGuests(prev => prev + 1);
              else alert("Add more rooms to accommodate more guests.");
            }}>+</button>
          </div>
          <input
            min={1}
            max={rooms * 2}
            id="guests"
            type="number"
            value={guests}
            onChange={handleGuestChange}
            className="hidden md:block rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
            placeholder="1"
          />
        </div>

        {/* Check-In */}
        <div className="flex flex-col">
          <label htmlFor="checkIn" className="text-sm font-medium">Check in</label>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
            required
          />
        </div>

        {/* Check-Out */}
        <div className="flex flex-col">
          <label htmlFor="checkOut" className="text-sm font-medium">Check out</label>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
            required
          />
        </div>

        {/* Room Type */}
        <div className="flex flex-col">
          <label htmlFor="roomType" className="text-sm font-medium">Room Type</label>
          <select
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[180px]"
          >
            <option value="Super Deluxe Room">Super Deluxe Room</option>
            <option value="Semi Deluxe Room">Semi Deluxe Room</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-md bg-black py-1 px-1 text-white cursor-pointer max-md:w-full max-md:py-2 transition duration-300 hover:bg-gray-900"
        >
          
            
              <img src={assets.searchIcon} alt="" className="h-5" />
              <span className='text-center'>Check Availability</span>
            
          
        </button>
      </form>

      {/* Error message */}
      {errorMessage && (
        <p className="mt-4 text-sm text-red-500 bg-white bg-opacity-80 px-4 py-2 rounded">{errorMessage}</p>
      )}
    </div>
  );
};

export default Hero;
