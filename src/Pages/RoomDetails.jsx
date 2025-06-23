import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import Starrating from '../Components/Starrating';


const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [token, setToken] = useState(null);
  const [nights, setNights] = useState(1);
const [totalPrice, setTotalPrice] = useState(1);

const [user, setUser] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) setUser(JSON.parse(userJson));
  }, []);
console.log(import.meta.env.REACT_APP_RAZORPAY_KEY_ID);

useEffect(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  setCheckIn(today.toISOString().split('T')[0]);
  setCheckOut(tomorrow.toISOString().split('T')[0]);
}, []);

useEffect(() => {
  if (room && checkIn && checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
      setNights(days);
      setTotalPrice(days * room.pricePerNight * rooms);
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  } else {
    setNights(0);
    setTotalPrice(0);
  }
}, [room, checkIn, checkOut, rooms]);
{/* 
  const handlePaymentBooking = async (paymentMethod) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
  const checkOutDate = new Date(checkOut).setHours(0, 0, 0, 0);

  if (checkInDate < today) return alert("Check-in cannot be in the past.");
  if (checkOutDate <= checkInDate) return alert("Check-out must be after check-in.");

  const actualPrice = paymentMethod === 'Pay Half Amount' 
    ? totalPrice / 2 
    : totalPrice;

  try {
    const res = await fetch('https://coralcreek-backend.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        room: room._id,
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        guests,
        totalPrice: actualPrice,
        paymentMethod,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Booking failed');

    alert(`${paymentMethod} booking successful!`);
    navigate('/my-bookings');
  } catch (err) {
    console.error(err);
    alert('Booking error: ' + err.message);
  }
};

*/}

  {/* handlePayment ********************************************************************************************/}
  const handlePayment = async (paymentMethod) => {
  if (!room || nights === 0) return alert("Incomplete booking info");

  const payload = {
    room: room._id,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests,
    totalPrice,
    paymentMethod
  };
 
  try {
    // Step 1: Create Booking in DB
    const bookingRes = await fetch('https://coralcreek-backend.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const bookingData = await bookingRes.json();
    if (!bookingRes.ok) throw new Error(bookingData.error);

    // Step 2: Create Razorpay order
   const fullAmount = room.pricePerNight * nights * rooms * 1.18 * 1.02;
const amountToPay = Math.round(
  (paymentMethod === 'Pay Half Amount' ? fullAmount / 2 : fullAmount) * 100
); // Convert to paise
console.log('Sending Razorpay amount (paise):', amountToPay);



    const orderRes = await fetch('https://coralcreek-backend.onrender.com/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: amountToPay, bookingId: bookingData.booking._id })
      

    });

    const order = await orderRes.json();

    // Step 3: Razorpay Checkout
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Coral Creek Resort",
      description: "Room Booking Payment",
      order_id: order.id,
  handler: async function (response) {
  console.log("✅ Razorpay Success Handler Called");
  console.log("Razorpay response:", response);

  // ✅ 1. Update Booking
  await fetch(`https://coralcreek-backend.onrender.com/api/bookings/${bookingData.booking._id}/pay-success`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      paymentId: response.razorpay_payment_id,
      isPaid: true,
      status: 'confirmed',
     amountPaid: amountToPay/100,
   
      
    })
  });

  // ✅ 2. Create Payment record manually
  await fetch('https://coralcreek-backend.onrender.com/api/payments/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      razorpayPaymentId: response.razorpay_payment_id,
      amountPaid: order.amount/100 , // amount in rupees
         booking:bookingData.booking._id,
      user: user._id || user.id,
      status: 'successful'
    })
  });

  alert("Payment successful!");
  navigate('/mybookings');
}
,
      prefill: {
        name: user?.name || '',
        email: user?.email || ''
      },
      theme: {
        color: "#000"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Payment error: " + err.message);
  }
};


  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`https://coralcreek-backend.onrender.com/api/rooms/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Room not found');
        setRoom(data);
        setMainImage(data.images?.[0]);
      } catch (err) {
        alert(err.message);
        navigate('/');
      }
    };
  

    

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('Please login first!');
      navigate('/login');
    } else {
      setToken(storedToken);
    }

    fetchRoom();
  }, [id, navigate]);

  const handleRoomChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setRooms(value);
    if (guests > value * 2) setGuests(value * 2);
  };

  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value > rooms * 2) {
      alert("Please add more rooms to accommodate more guests.");
    }
    setGuests(value);
  };


  if (!room) return <p className='text-center p-10'>Loading room details...</p>;

  return (
    <div className='py-28  md:py-35 px-4 md:px-16  lg:px-24 xl:px-32'>
      {/* Room info */}
      <h1 className='text-3xl border-b-3 w-1/4 md:text-4xl font-playfair'>{room.roomType}</h1>
      <div className='text-gray-600'>{room.location}</div>
      <div className='mt-2 flex flex-row'><Starrating /> 100+ reviews</div>

      {/* Room Images */}
      <div className=' flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt='Main' className='w-full rounded-xl shadow-lg' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full '>
          {room.images.map((img, i) => (
            <img key={i} src={img} onClick={() => setMainImage(img)} alt='Thumbnail'
              className={`rounded-xl cursor-pointer ${mainImage === img ? 'outline-4 outline-orange-500' : ''}`} />
          ))}
        </div>
      </div>

      
           {/* Booking Card */}
<div className="bg-white  rounded-xl  p-6 w-full mt-10 space-y-3">
  <h2 className="text-2xl font-semibold mb-4">Book Your Room</h2>
  
  <form onSubmit={(e) => {
    e.preventDefault();
    const today = new Date().setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
    const checkOutDate = new Date(checkOut).setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check-in date cannot be before today.");
      return;
    }
    if (checkInDate >= checkOutDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    // Form is valid, you can proceed to show pricing or call API
  }} className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* Rooms */}
    <div className="flex flex-col">
      <label htmlFor="rooms" className="text-sm font-medium">Rooms</label>
      <input
        min={1}
        max={10}
        id="rooms"
        type="number"
        value={rooms}
        onChange={handleRoomChange}
        className="rounded border border-gray-300 px-3 py-2 mt-1 text-sm outline-none"
      />
    </div>

    {/* Guests */}
    <div className="flex flex-col">
      <label htmlFor="guests" className="text-sm font-medium">Guests</label>
      <input
        min={1}
        max={rooms * 2}
        id="guests"
        type="number"
        value={guests}
        onChange={handleGuestChange}
        className="rounded border border-gray-300 px-3 py-2 mt-1 text-sm outline-none"
      />
    </div>

    {/* Check In */}
    <div className="flex flex-col">
  <label htmlFor="checkIn" className="text-sm font-medium">Check-In</label>
  <input
    type="date"
    id="checkIn"
    value={checkIn}
    onChange={(e) => setCheckIn(e.target.value)}
    className="rounded border border-gray-300 px-3 py-2 mt-1 text-sm outline-none"
    min={new Date().toISOString().split("T")[0]}
    required
  />
</div>

    {/* Check Out */}
    <div className="flex flex-col">
  <label htmlFor="checkOut" className="text-sm font-medium">Check-Out</label>
  <input
    type="date"
    id="checkOut"
    value={checkOut}
    onChange={(e) => setCheckOut(e.target.value)}
    className="rounded border border-gray-300 px-3 py-2 mt-1 text-sm outline-none"
    min={checkIn}
    required
  />
</div>
{/* Room Type */}

 <div className="flex flex-col">
  <label htmlFor="roomType" className="text-sm font-medium">Room Type</label>
  <input
    id="roomType"
    type="text"
    value={room.roomType}
    readOnly
    className="rounded border border-gray-300 px-3 py-1.5 mt-1 text-sm outline-none bg-gray-100 max-w-[200px]"
  />
</div>
  </form>

  {/* Pricing Summary */}
 {room && nights > 0 && (
  <div className='mt-6 space-y-4'>
    <div className='text-xl font-semibold'>
      <div className="border-t pt-4 space-y-2 text-gray-700 text-base">
      <div className="flex justify-between">
        <span>Room Price ({nights} nights × {rooms} room)</span>
        <span>₹{(room.pricePerNight * nights * rooms).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className='text-sm text-gray-500'>GST (18%)</span>
        <span className='text-sm text-gray-500'>₹{(room.pricePerNight * nights * rooms * 0.18).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className='text-sm text-gray-500'>Platform Fee (2%)</span>
        <span className='text-sm text-gray-500'>₹{(room.pricePerNight * nights * rooms * 1.18 * 0.02).toFixed(2)}</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-black text-lg">
        <span>Total Payable</span>
        <span>₹{(room.pricePerNight * nights * rooms * 1.18 * 1.02).toFixed(2)}</span>
      </div>
    </div>
    </div>
    <div className='text-sm text-gray-500'>
      GST and Razorpay fee extra. Booking terms apply.
    </div>

    <div className="flex flex-wrap gap-4">
    <button
  onClick={() => handlePayment( "Pay Full Amount")}
  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded"
>
  Pay Full Amount
</button>

      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
        onClick={() => handlePayment('Pay Half Amount')}
      >
        Pay Half Amount
      </button>
    </div>
  </div>
)}

     {/* Booking Policy */}
      <div className='max-w-3xl border-y border-gray-300 my-10 py-10 text-gray-500'>
           <p className='text-sm text-gray-500' >
            Booking terms=50% advance payment is required before booking the room.

Cancellation policy-=If you cancel your booked room within seven days, you will only get a refund of 50% of the advance amount you paid. After seven days, the advance amount will not be refunded.
            </p>
       </div>
 
</div>




      {/* Amenities */}
      <div className='mt-10'>
        <h2 className='text-xl font-bold mb-4'>Amenities</h2>
        <div className='flex flex-wrap gap-4'>
          {room.features.map((feature, idx) => (
            <div key={idx} className='bg-gray-100 px-3 py-2 rounded'>{feature}</div>
          ))}
        </div>
      </div>
     

        {/* Common Specifications */}
          <div className='mt-5 space-y-4'>
        {roomCommonData.map((spec,index)=>(
            <div key={index} className='flex items-start gap-2'>
                <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5'/>
                <div>
                    <p className='text-base'>{spec.title}</p>
                    <p className='text-gray-500'>{spec.description}</p>
                </div>
            </div>
        ))}
       </div>

      
    
 
      {/* Map */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-2'>Resort Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d84344.10455421753!2d92.81056134972992!3d12.18403714266162!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x308f37d7893d6ce5%3A0x3fbcaa8f58c60e44!2sOYO%2061587%20Coral%20Creek%20Resort!5e0!3m2!1sen!2sin!4v1749767364854!5m2!1sen!2sin"
          width="100%" height="400" allowFullScreen="" loading="lazy"
          className='rounded-xl'
          referrerPolicy="no-referrer-when-downgrade"
          title='Map'
        ></iframe>
      </div>
      

    </div>
  );
};

export default RoomDetails;
