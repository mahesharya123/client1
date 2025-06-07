import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomsDummyData } from '../assets/assets';
import Slider from "react-slick";
const SingleRoomBooking = () => {
  const { id } = useParams();
  const room = roomsDummyData.find(r => r._id === id);

  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
   const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1
};
  if (!room) return <p>Room not found.</p>;

  const totalPrice = guests * rooms * room.pricePerNight;

  return (
    <>
   <div className='flex flex-col md:flex-col gap-10 mt-10 px-6 md:px-20 py-10'>
  {/* Left Section - Images and Details */}
  <div className='flex-1'>
    <h1 className='text-3xl   bg-white font-bold mb-2'>{room.hotel.name}</h1>
    <h2 className='  mb-6   bg-white bg-opacity-50 px-18 py-2 w-70 text-gray-700  text- rounded'>{room.roomType}</h2>
  <div className='flex md:flex-row flex-col gap-30'>
    <div className="w-full max-w-3xl mb-6 mx-auto md:mx-0">
      <Slider {...sliderSettings}>
        {room.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`room-img-${i}`}
            className='w-full h-84 md:h-full lg:h-full  object-cover rounded-lg shadow'
          />
        ))}
      </Slider>
    </div>
           <div className='w-full  md:w-1/2  p-6 bg-white rounded-lg shadow-md'>
        <h3 className='text-xl font-semibold mb-4'>Price Details</h3>

        <div className='mb-4'>
          <label className='block mb-1'>Guests</label>
          <input type='number' min={1} value={guests} onChange={(e) => setGuests(+e.target.value)} className='w-full border rounded p-2'/>
        </div>

        <div className='mb-4'>
          <label className='block mb-1'>Rooms</label>
          <input type='number' min={1} value={rooms} onChange={(e) => setRooms(+e.target.value)} className='w-full border rounded p-2'/>
        </div>

        <div className='mb-6 '>
          <p className='text-lg mt-2'>Per Night Price: <strong>₹{room.pricePerNight}</strong></p>
          <p className='text-lg mt-2'>Total: <strong>₹{totalPrice}</strong></p>
        </div>

        <button className='w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-2'>Pay Now</button>

        <div className="mt-3 bg-white p-6  max-w-3xl ">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Information</h3>
            <p className="text-gray-600 mb-4">
            Booking terms=50% advance payment is required before booking the room.

Cancellation policy-=If you cancel your booked room within seven days, you will only get a refund of 50% of the advance amount you paid. After seven days, the advance amount will not be refunded.
            </p>
            <p className="text-gray-600">
              You can also book a room by visiting in person at the hotel reception but, we advise booking a hotel room in Baratang Island prior to your arrival to avoid last-minute hassles.
            </p>
          </div>
      </div>
      
        </div>  
  </div>

  {/* You can add a Right Section here if needed */}



        {/* Amenities */}
        <div>
          <h3 className='text-2xl font-semibold mb-4'>Amenities at Coral Creek Resort</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              'Restaurant', 'Lounge', 'Room Service', 'Air Conditioning', 'Power Backup', 'Housekeeping',
              'Free Parking', 'Free Wi-Fi', 'Paid Airport Transfers', 'Paid Shuttle Service', 'Dining Area',
              'Coffee Shop', 'TV', 'Luggage Storage', 'Multilingual Staff', 'Luggage Assistance', 'Bellboy Service',
              'Caretaker', 'Wake-up Call', 'Facilities for Guests with Disabilities', 'Beach', 'Reception', 'Balcony/Terrace',
              'Seating Area',
            ].map((item, idx) => (
              <div key={idx} className=' p-2 rounded shadow-sm  text-sm'>{item}</div>
            ))}
          </div>
        </div>
      

      {/* Right Section - Pricing and Booking */}
     

    </div>
    
    </>
  );
};

export default SingleRoomBooking;
