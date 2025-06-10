import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility for CSV export
const exportCSV = (bookings) => {
  if (!bookings.length) return;
  const headers = ['Name', 'Email', 'Phone', 'Location', 'Pickup Date', 'Return Date', 'Status'];
  const rows = bookings.map(b => [
    b.name, b.email, b.phone, b.location,
    new Date(b.pickupDate).toLocaleString(),
    new Date(b.returnDate).toLocaleString(),
    b.status || 'upcoming'
  ]);
  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.map(v => `"${v}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `bookings_export_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function SecretPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('pickupDate');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedBookings, setSelectedBookings] = useState(new Set());
  const [modalBooking, setModalBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://backend-i828.onrender.com/api/search/all');
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error('❌ Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const res = await fetch(`https://backend-i828.onrender.com/api/search/${action}/${id}`, {
  method: 'PUT',
});
      if (!res.ok) throw new Error('Failed update');
      const updated = await res.json();
      toast.success(`✅ Booking ${action}ed`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
      );
      // If modal open, update it
      if (modalBooking && modalBooking._id === id) {
        setModalBooking({ ...modalBooking, status: updated.status });
      }
    } catch {
      toast.error(`❌ Failed to ${action} booking`);
    }
  };

  // Bulk update multiple bookings
  const bulkUpdateStatus = async (action) => {
    if (selectedBookings.size === 0) {
      toast.info('Select bookings first');
      return;
    }
    const ids = Array.from(selectedBookings);
    let successCount = 0;
    for (const id of ids) {
      try {
        const res = await fetch(`https://backend-i828.onrender.com/api/search/${action}/${id}`, {
  method: 'PUT',
});
        if (res.ok) {
          const updated = await res.json();
          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
          );
          successCount++;
        }
      } catch {}
    }
    toast.success(`✅ ${successCount} bookings ${action}ed`);
    setSelectedBookings(new Set());
  };

  // Filter + search bookings
  const filtered = useMemo(() => {
    let data = bookings;

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (b) =>
          b.name.toLowerCase().includes(lower) ||
          b.email.toLowerCase().includes(lower) ||
          b.phone.toLowerCase().includes(lower) ||
          b.location.toLowerCase().includes(lower)
      );
    }

    // Sort bookings
    data = data.sort((a, b) => {
      let vA = a[sortBy];
      let vB = b[sortBy];
      if (sortBy.includes('Date')) {
        vA = new Date(vA);
        vB = new Date(vB);
      }
      if (vA < vB) return sortDir === 'asc' ? -1 : 1;
      if (vA > vB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [bookings, searchTerm, sortBy, sortDir]);

  // Pagination logic
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Select / deselect booking checkbox
  const toggleSelect = (id) => {
    setSelectedBookings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Select all on current page
  const toggleSelectAll = () => {
    const allSelected = paged.every((b) => selectedBookings.has(b._id));
    if (allSelected) {
      // Deselect all
      setSelectedBookings((prev) => {
        const newSet = new Set(prev);
        paged.forEach((b) => newSet.delete(b._id));
        return newSet;
      });
    } else {
      // Select all
      setSelectedBookings((prev) => {
        const newSet = new Set(prev);
        paged.forEach((b) => newSet.add(b._id));
        return newSet;
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Admin Panel</h2>
        <nav className="flex flex-col gap-4 text-lg">
          <button
            className="py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 transition"
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className="py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 transition"
            onClick={() => exportCSV(filtered)}
          >
            Export CSV
          </button>
          <button
            className="py-2 px-4 rounded bg-red-600 hover:bg-red-700 transition mt-auto"
            onClick={() => {
              toast.info('Logout not implemented');
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          🔐 Bookings Management
        </motion.h1>

        {/* Search and bulk actions */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by name, email, phone, location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="flex-grow bg-gray-800 rounded px-4 py-2 text-white placeholder-gray-400"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => bulkUpdateStatus('confirm')}
              disabled={selectedBookings.size === 0}
              className={`px-4 py-2 rounded-full text-white ${
                selectedBookings.size === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } transition`}
            >
              Confirm Selected
            </button>
            <button
              onClick={() => bulkUpdateStatus('cancel')}
              disabled={selectedBookings.size === 0}
              className={`px-4 py-2 rounded-full text-white ${
                selectedBookings.size === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              } transition`}
            >
              Cancel Selected
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(pageSize)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        ) : (
          <>
            <table className="w-full table-auto border-collapse border border-gray-700 rounded overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 border border-gray-700">
                    <input
                      type="checkbox"
                      checked={paged.every((b) => selectedBookings.has(b._id))}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  {['Name', 'Email', 'Phone', 'Location', 'Pickup Date', 'Return Date', 'Status'].map((header, idx) => {
                    const key = header.replace(/\s+/g, '').toLowerCase();
                    // map key to booking object keys
                    const mapKey = {
                      name: 'name',
                      email: 'email',
                      phone: 'phone',
                      location: 'location',
                      pickupdate: 'pickupDate',
                      returndate: 'returnDate',
                      status: 'status',
                    }[key];
                    return (
                      <th
                        key={idx}
                        className="p-3 border border-gray-700 cursor-pointer select-none"
                        onClick={() => {
                          if (sortBy === mapKey) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                          else {
                            setSortBy(mapKey);
                            setSortDir('asc');
                          }
                        }}
                      >
                        {header}{' '}
                        {sortBy === mapKey && (sortDir === 'asc' ? '▲' : '▼')}
                      </th>
                    );
                  })}
                  <th className="p-3 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-400">
                      No bookings found.
                    </td>
                  </tr>
                )}
                {paged.map((b) => (
                  <tr
                    key={b._id}
                    className="hover:bg-gray-700 cursor-pointer"
                    onClick={() => setModalBooking(b)}
                  >
                    <td className="p-2 border border-gray-700 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedBookings.has(b._id)}
                        onChange={() => toggleSelect(b._id)}
                      />
                    </td>
                    <td className="p-2 border border-gray-700">{b.name}</td>
                    <td className="p-2 border border-gray-700">{b.email}</td>
                    <td className="p-2 border border-gray-700">{b.phone}</td>
                    <td className="p-2 border border-gray-700">{b.location}</td>
                    <td className="p-2 border border-gray-700">{new Date(b.pickupDate).toLocaleString()}</td>
                    <td className="p-2 border border-gray-700">{new Date(b.returnDate).toLocaleString()}</td>
                    <td
                      className={`p-2 border border-gray-700 font-semibold text-center ${
                        b.status === 'cancelled'
                          ? 'text-red-500'
                          : b.status === 'confirmed'
                          ? 'text-green-400'
                          : 'text-yellow-300'
                      }`}
                    >
                      {b.status || 'upcoming'}
                    </td>
                    <td
                      className="p-2 border border-gray-700 text-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {b.status !== 'confirmed' && (
                        <button
                          onClick={() => updateStatus(b._id, 'confirm')}
                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white"
                          title="Confirm Booking"
                        >
                          ✔️
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(b._id, 'cancel')}
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white"
                          title="Cancel Booking"
                        >
                          ✖️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 rounded bg-indigo-600 disabled:bg-gray-600"
              >
                Prev
              </button>
              {[...Array(pageCount)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? 'bg-indigo-800 font-bold' : 'bg-indigo-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                className="px-3 py-1 rounded bg-indigo-600 disabled:bg-gray-600"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Modal for booking details */}
        {modalBooking && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setModalBooking(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="bg-gray-900 rounded-lg max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {modalBooking.name}</p>
                <p><strong>Email:</strong> {modalBooking.email}</p>
                <p><strong>Phone:</strong> {modalBooking.phone}</p>
                <p><strong>Location:</strong> {modalBooking.location}</p>
                <p><strong>Pickup Date:</strong> {new Date(modalBooking.pickupDate).toLocaleString()}</p>
                <p><strong>Return Date:</strong> {new Date(modalBooking.returnDate).toLocaleString()}</p>
                <p><strong>Status:</strong> <span
                  className={`font-semibold ${
                    modalBooking.status === 'cancelled'
                      ? 'text-red-500'
                      : modalBooking.status === 'confirmed'
                      ? 'text-green-400'
                      : 'text-yellow-300'
                  }`}
                >
                  {modalBooking.status || 'upcoming'}
                </span></p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {modalBooking.status !== 'confirmed' && (
                  <button
                    onClick={() => updateStatus(modalBooking._id, 'confirm')}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                  >
                    Confirm
                  </button>
                )}
                {modalBooking.status !== 'cancelled' && (
                  <button
                    onClick={() => updateStatus(modalBooking._id, 'cancel')}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => setModalBooking(null)}
                  className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </main>
    </div>
  );
}
