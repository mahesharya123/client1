import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [payments, setPayments] = useState({});
  const fetchPayments = async () => {
  try {
    const res = await fetch("https://coralcreek-backend.onrender.com/api/payments/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch payments");

    const paymentMap = {};
    data.forEach(payment => {
      paymentMap[payment.booking] = payment.amountPaid;
    });

    setPayments(paymentMap);
  } catch (err) {
    console.error(err);
  }
};

fetchPayments();




  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("https://coralcreek-backend.onrender.com/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch bookings');

        setBookings(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, navigate]);

  if (loading) {
    return <div className="p-10 text-center">Loading your bookings...</div>;
  }

  if (!bookings.length) {
    return <div className="p-10 text-center text-gray-500">No bookings found.</div>;
  }

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Room Type</th>
             <th className="px-4 py-2 text-left">Paid Amount</th>
              <th className="px-4 py-2 text-left">Guests</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{booking.room.roomType}</td>
               <td className="px-4 py-2">₹{booking.totalPrice}</td>

                <td className="px-4 py-2">{booking.guests}</td>
                <td className="px-4 py-2">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 font-medium ${booking.paymentMethod=='Pay Full Amount' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {booking.paymentMethod =='Pay Full Amount' ? 'Full Paid' : 'Half Paid'}
                </td>
                <td className={`px-4 py-2 font-medium ${booking.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                  {booking.isPaid ? 'Comfirmed' : 'Pending'}
                </td>
              
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
