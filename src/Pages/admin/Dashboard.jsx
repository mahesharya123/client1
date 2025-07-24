import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | confirmed
  const [todayTotal, setTodayTotal] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://coralcreek-backend-production.up.railway.app/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBookings(data);
      setFiltered(data);

      const today = new Date().toISOString().split('T')[0];

      const todayConfirmedBookings = data.filter(
        (b) => b.createdAt?.startsWith(today) && b.status === 'confirmed'
      );

      const totalConfirmedRevenue = todayConfirmedBookings.reduce(
        (sum, b) => sum + (b.totalPrice || 0),
        0
      );

      setTodayTotal(todayConfirmedBookings.length);
      setTodayRevenue(totalConfirmedRevenue);
    } catch (err) {
      console.error(err.message);
      alert('Failed to load bookings');
    }
  };

  fetchBookings();
}, []);


  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterType]);

  const applyFilters = () => {
    let temp = [...bookings];

    if (filterType === 'confirmed') {
      temp = temp.filter((b) => b.status === 'confirmed');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      temp = temp.filter((b) => b.user?.name?.toLowerCase().includes(q));
    }

    setFiltered(temp);
  };

  return (
    <div className='border-t-1 mt-10'>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Today's Bookings</p>
          <h2 className="text-3xl font-bold">{todayTotal}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Today's Revenue</p>
          <h2 className="text-3xl font-bold">₹{todayRevenue.toFixed(2)}</h2>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        {/* Filter by status */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filterType === 'all'}
              onChange={() => setFilterType('all')}
            />
            <span>All Bookings</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="filter"
              value="confirmed"
              checked={filterType === 'confirmed'}
              onChange={() => setFilterType('confirmed')}
            />
            <span>Confirmed Bookings</span>
          </label>
        </div>

        {/* Search */}
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-[250px]"
          />
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Search size={18} /> Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Room</th>
              <th className="p-3">Check-in</th>
              <th className="p-3">Check-out</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
             
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{b.user?.name || 'N/A'}</td>
                <td className="p-3">{b.room?.roomType || 'N/A'}</td>
                <td className="p-3">{b.checkInDate?.slice(0, 10)}</td>
                <td className="p-3">{b.checkOutDate?.slice(0, 10)}</td>
                <td className="p-3">{b.guests}</td>
               

                <td className="p-3">
                  <span
                    className={`font-semibold ${
                      b.status === 'confirmed'
                        ? 'text-green-600'
                        : b.status === 'cancelled'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.paymentMethod === 'Pay Full Amount'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {b.paymentMethod === 'Pay Full Amount' ? 'Full Paid' : 'Half Paid'}
                  </span>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
