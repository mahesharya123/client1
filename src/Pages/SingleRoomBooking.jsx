import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const SingleRoomBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(location.state?.guests || 1);
  const [rooms, setRooms] = useState(location.state?.rooms || 1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('Please login first!');
      navigate('/login');
    } else {
      setToken(storedToken);
    }
  }, []);
useEffect(() => {
  const fetchRoom = async () => {
    try {
      const res = await fetch(`https://coralcreek-backend.onrender.com/api/rooms/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Room not found');
      setRoom(data);
    } catch (error) {
      console.error('Failed to load room:', error);
      alert('Room not found');
    } finally {
      setLoading(false);
    }
  };

  fetchRoom();
}, [id]);


  const isDateValid = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
    const checkOutDate = new Date(checkOut).setHours(0, 0, 0, 0);

    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return false;
    }

    if (checkInDate < today) {
      alert('Check-in date cannot be in the past.');
      return false;
    }

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date.');
      return false;
    }

    return true;
  };

  const totalPrice = rooms * room?.pricePerNight || 0;

  const handleBooking = async () => {
    if (!token) {
      alert('Please login first!');
      return;
    }

    if (!isDateValid()) return;

    try {
      const res = await fetch('https://coralcreek-backend.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room: id,
          checkIn,
          checkOut,
          guests,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      alert('Booking successful!');
      navigate('/my-bookings');
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading room details...</p>;
  if (!room) return <p className="text-center mt-10 text-red-500">Room not found.</p>;

  return (
    <div className='flex flex-col md:flex-col gap-10 mt-10 px-6 md:px-20 py-10'>
      <div className='flex-1'>
        <h1 className='text-3xl bg-white font-bold mb-2'>{room.roomType}</h1>
        <h2 className='mb-6 bg-white bg-opacity-50 px-18 py-2 text-gray-700'>{room.hotelName}</h2>

        <div className='flex md:flex-row flex-col gap-30'>
          <div className='w-full max-w-3xl mb-4 mx-auto'>
            <Slider {...sliderSettings}>
              {room.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`room-img-${i}`}
                  className='w-full h-84 object-cover rounded-lg shadow'
                />
              ))}
            </Slider>
          </div>

          <div className='w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold mb-4'>
              Price Details ₹{room.pricePerNight}
            </h3>

            {/* Guests */}
            <div className='mb-4'>
              <label className='block mb-1'>Guests</label>
              <input
                type='number'
                min={1}
                max={rooms * 2}
                value={guests}
                onChange={e => setGuests(Math.min(rooms * 2, +e.target.value))}
                className='w-full border rounded p-2'
              />
              <small className='text-sm text-gray-600'>Max 2 guests per room.</small>
            </div>

            {/* Rooms */}
            <div className='mb-4'>
              <label className='block mb-1'>Rooms</label>
              <input
                type='number'
                min={1}
                value={rooms}
                onChange={e => {
                  const val = Math.max(1, +e.target.value);
                  setRooms(val);
                  if (guests > val * 2) setGuests(val * 2);
                }}
                className='w-full border rounded p-2'
              />
            </div>

            {/* Check-In */}
            <div className='mb-4'>
              <label className='block mb-1'>Check-In Date</label>
              <input
                type='date'
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className='w-full border rounded p-2'
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Check-Out */}
            <div className='mb-4'>
              <label className='block mb-1'>Check-Out Date</label>
              <input
                type='date'
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className='w-full border rounded p-2'
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Price Summary */}
            <div className='mb-6'>
              <p className='text-lg mt-2'>Total: <strong>₹{totalPrice}</strong></p>
              <small>including all taxes</small>
            </div>

            <button
              onClick={handleBooking}
              className='w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition mt-2'
            >
              Continue Booking
            </button>

            {/* Booking Info */}
            <div className='mt-3 bg-white p-6'>
              <h3 className='text-xl font-bold mb-4'>Booking Information</h3>
              <p className='text-gray-600 mb-4'>
                50% advance payment required. If cancelled within 7 days, 50% refund. No refund after that.
              </p>
              <p className='text-gray-600'>
                Walk-in bookings allowed, but advance booking is recommended to avoid last-minute hassle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className='text-2xl font-semibold mb-4'>Amenities at {room.hotelName}</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {(room.features || []).map((item, idx) => (
            <div key={idx} className='p-2 rounded shadow-sm text-sm'>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleRoomBooking;
