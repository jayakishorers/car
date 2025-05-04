import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/search/history/${user.email}`);
      setBookingHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/search/cancel/${bookingId}`);
      setBookingHistory(bookingHistory.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const saveEdits = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, editedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile updates:", error);
    }
  };

  const filteredBookings = bookingHistory.filter((booking) => {
    const today = new Date();
    const pickupDate = new Date(booking.pickupDate);
    const returnDate = new Date(booking.returnDate);

    if (filter === 'upcoming' && pickupDate > today) return true;
    if (filter === 'past' && returnDate < today) return true;
    if (filter === 'cancelled' && booking.status === 'cancelled') return true;
    if (filter === 'all') return true;

    return false;
  });

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white flex flex-col items-center py-6 px-4">
      <div className="max-w-6xl w-full bg-black bg-opacity-90 shadow-xl rounded-xl p-8 space-y-8 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://source.unsplash.com/random/1200x800')" }}></div>

        {/* Profile Section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:space-x-8">
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.28.534 6.121 1.475M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </motion.div>

          <div className="mt-4 md:mt-0 flex-1">
            <motion.h2
              className="text-5xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleEditChange}
                  className="border-b-2 border-gray-300 text-lg font-medium focus:outline-none bg-transparent"
                />
              ) : (
                user.name
              )}
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {user.email}
            </motion.p>
            <motion.p
              className="text-lg text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone || ''}
                  onChange={handleEditChange}
                  className="border-b-2 border-gray-300 text-lg font-medium focus:outline-none bg-transparent"
                />
              ) : (
                user.phone || 'Phone not available'
              )}
            </motion.p>
            <motion.button
              onClick={() => (editing ? saveEdits() : setEditing(true))}
              className="mt-6 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-green-500 transition-all duration-300"
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mt-8">
          {['all', 'upcoming', 'past', 'cancelled'].map((key) => (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-3 rounded-lg transition-all ${filter === key ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-800'}`}
              whileHover={{ scale: 1.05 }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Booking List */}
        <div className="space-y-6 mt-10">
          <motion.h3
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Your Booking History
          </motion.h3>

          {filteredBookings.length === 0 ? (
            <p className="text-gray-400">No bookings match your filter.</p>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking, idx) => (
                <motion.div
                  key={idx}
                  className="border-2 p-6 rounded-xl shadow-2xl bg-gradient-to-r from-gray-800 via-gray-900 to-black space-y-4 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <p><strong>Location:</strong> {booking.location}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>From:</strong> {new Date(booking.pickupDate).toLocaleDateString()}</p>
                  <p><strong>To:</strong> {new Date(booking.returnDate).toLocaleDateString()}</p>
                  {booking.status !== 'cancelled' && (
                    <motion.button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      Cancel Booking
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Car Rental. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
