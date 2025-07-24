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
    const res = await fetch("https://coralcreek-backend-production.up.railway.app/api/payments/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Payments data:", data);
    if (!res.ok) throw new Error(data.error || "Failed to fetch payments");

    const paymentMap = {};
    data.forEach(payment => {
  const bookingId = typeof payment.booking === 'object' ? payment.booking._id : payment.booking;
  paymentMap[bookingId] = payment.amountPaid;
});
    setPayments(paymentMap);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (!token) return;
  fetchPayments( );
  

}, [token]);



const [showModal, setShowModal] = useState(false);
const [bookingIdToCancel, setBookingIdToCancel] = useState(null);

const openCancelModal = (bookingId) => {
  setBookingIdToCancel(bookingId);
  setShowModal(true);
};

const handleConfirmCancel = async (bookingId) => {
  try {
    const res = await fetch(`https://coralcreek-backend-production.up.railway.app/api/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.ok) {
      const updated = await res.json();
      // Update bookings state to reflect the canceled booking
      setBookings(prev =>
        prev.map(b => (b._id === bookingId ? { ...b, status: updated.status } : b))
      );
      setShowModal(false);
      alert('Booking cancelled successfully. Refund details sent to your email and phone.');
    } else {
      const data = await res.json();
      alert(data.error || 'Cancel failed');
    }
  } catch (err) {
    alert('Server error. Try again later.');
  }
};







  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("https://coralcreek-backend-production.up.railway.app/api/bookings/user", {
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
             <th className="px-4 py-2 text-left">Amount Paid</th>
              <th className="px-4 py-2 text-left">Guests</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Cancel Booking</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{booking.room.roomType}</td>


              <td className="px-4 py-2 text-blue-600 font-medium">
  ₹{payments[booking._id] ? (payments[booking._id]).toFixed(2) : 'N/A'}
</td>

                <td className="px-4 py-2">{booking.guests}</td>
                <td className="px-4 py-2">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 font-medium ${booking.paymentMethod=='Pay Full Amount' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {booking.paymentMethod =='Pay Full Amount' ? 'Full Paid' : 'Half Paid'}
                </td>
                  <td className={`px-4 py-2 font-medium ${
          booking.status === 'confirmed' ? 'text-green-600' :
             booking.status === 'Cancelled' ? 'text-red-600' :
                  'text-yellow-600'
                       }`}>
                   {booking.status}
                 </td>

              <td className="px-4 py-2">
                  {booking.status !== 'Cancelled' && (
                                        <button
  onClick={() => openCancelModal(booking._id)}
  disabled={booking.status === 'Pending' || booking.status === 'Cancelled'}
  className={`mt-2 px-4 py-1 rounded transition 
    ${booking.status === 'Pending' || booking.status === 'Cancelled'
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-red-600 text-white hover:bg-red-700'}`}
>
  Cancel Booking
</button>
                        )}
              </td>
               { console.log("Booking ID:", booking._id)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel Confirmation Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl animate-fade-in">
      <h2 className="text-xl font-semibold text-red-600 mb-2">Cancel Booking?</h2>
      <p className="text-gray-700 mb-4">
        Are you sure you want to cancel this booking?
      </p>

      <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded mb-4 space-y-1">
        <p>• Only <strong>50%</strong> of the paid amount will be refunded if canceled <strong>within 7 days</strong> of booking.</p>
        <p>• <strong>No refund</strong> will be issued if you cancel after 7 days.</p>
        <p>• Refunds are processed within 7 business days.</p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
        >
          No, Keep Booking
        </button>
        <button
          onClick={() => handleConfirmCancel(bookingIdToCancel)}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Yes, Cancel It
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MyBookings;
