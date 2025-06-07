import React, { useState } from 'react';
import { assets, services } from '../assets/assets';


const Hero = () => {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const handleRoomChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setRooms(value);

    // Adjust guests if necessary
    const maxGuests = value * 2;
    if (guests > maxGuests) {
      setGuests(maxGuests);
    }
  };

  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxGuests = rooms * 2;

    if (value > maxGuests) {
      window.alert("Please add more rooms to accommodate additional guests.");
      return;
    }

    setGuests(value);
  };

  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white 
        h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${assets.HeroImg})`,
      }}
    >
      <p className="hidden md:flex bg-[#49B9FF] bg-opacity-50 px-18 py-2 w-70 text-white  text-m rounded-full mt-20">
      Coral Creek Resort
      </p>
      <p className="bg-[#49B9FF] md:hidden bg-opacity-50 px-4 py-2 w-full text-center text-m rounded-full mt-20">
      Coral Creek Resort
      </p>

      <h1 className="font-playfair text-gray-500 text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold max-w-xl mt-4">
        Experience the Perfect Blend of Comfort and Luxury
      </h1>

      <p className="max-w-[520px] mt-2 text-gray-500 text-sm sm:text-base ">
        Step into a world of unmatched luxury and comfort at the most exclusive hotel and resort. Your journey begins now.
      </p>

      <form className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 w-full max-w-4xl"
  onSubmit={(e) => {
    e.preventDefault();
    const today = new Date().setHours(0, 0, 0, 0);
    const checkInDate = new Date(e.target.checkIn.value).setHours(0, 0, 0, 0);
    const checkOutDate = new Date(e.target.checkOut.value).setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check-in date cannot be before today.");
      return;
    }

    if (checkInDate >= checkOutDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    // Proceed with availability check
    alert("Form submitted successfully!");
  }}
  
>
  <div className="flex flex-col">
    <label htmlFor="rooms" className="text-sm font-medium">Rooms</label>
    <input
      min={1}
      max={10}
      id="rooms"
      type="number"
      value={rooms}
      onChange={handleRoomChange}
      className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
      placeholder="1"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="checkIn" className="text-sm font-medium">Check in</label>
    <input
      id="checkIn"
      type="date"
      className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
      min={new Date().toISOString().split("T")[0]} // today's date
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="checkOut" className="text-sm font-medium">Check out</label>
    <input
      id="checkOut"
      type="date"
      className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="guests" className="text-sm font-medium">Guests</label>
    <input
      min={1}
      max={rooms * 2}
      id="guests"
      type="number"
      value={guests}
      onChange={handleGuestChange}
      className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]"
      placeholder="1"
    />
  </div>
   <div className='flex flex-col'>
    <label for="cars" className="text-sm font-medium">Room Type</label>

<select name="room" id="room"   className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none max-w-[100px]">
  <option value="Delux">Delux Room</option>
  <option value="semiDelux">Semi Delux Room</option>
 
</select>
   </div>
  <button
    type="submit"
    className="flex items-center justify-center gap-2 rounded-md bg-black py-3 px-4 text-white cursor-pointer max-md:w-full max-md:py-2 transition duration-300 hover:bg-gray-900"
  >
    <img src={assets.searchIcon} alt="" className="h-5" />
    <span>Check Availability</span>
  </button>
</form>

    </div>
  );
};

export default Hero;
