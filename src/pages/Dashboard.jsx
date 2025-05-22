import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [bookingHistory, setBookingHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [profile, setProfile] = useState({ username: '', phone: '' });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ username: '', phone: '' });
  const [saving, setSaving] = useState(false); // loading state

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  // Fetch user profile and bookings when email is available
  useEffect(() => {
    if (user?.email) {
      fetchBookings();
      fetchUserProfile(user.email);
    }
  }, [user?.email]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/search/history/${user.email}`);
      setBookingHistory(res.data);
    } catch (error) {
      console.error('Failed to fetch booking history:', error);
      toast.error('Failed to load bookings');
    }
  };

  const fetchUserProfile = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/profile/${email}`);
      setProfile(res.data);
      setEditData({ username: res.data.username, phone: res.data.phone });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/search/cancel/${bookingId}`);
      const updatedBooking = res.data;
      setBookingHistory((prev) =>
        prev.map((booking) => (booking._id === bookingId ? updatedBooking : booking))
      );
      toast.success('Booking cancelled');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!editData.username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put(`http://localhost:5000/api/users/update/${user.email}`, editData);
      // Backend might return updated user directly or inside 'user'
      const updatedProfile = res.data.user || res.data;
      setProfile(updatedProfile);
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const filteredBookings = bookingHistory.filter((booking) => {
    if (!booking) return false;
    const today = new Date();
    const pickupDate = new Date(booking.pickupDate || 0);
    const returnDate = new Date(booking.returnDate || 0);
    const status = booking.status || 'active';

    if (filter === 'upcoming') return pickupDate > today && status !== 'cancelled';
    if (filter === 'past') return returnDate < today && status !== 'cancelled';
    if (filter === 'cancelled') return status === 'cancelled';
    return true;
  });

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white flex flex-col items-center py-6 px-4">
      <div className="max-w-6xl w-full bg-black bg-opacity-90 shadow-xl rounded-xl p-6 md:p-8 space-y-8 relative">

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 relative z-10">
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 md:h-20 md:w-20 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.28.534 6.121 1.475M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </motion.div>

          <div className="mt-4 md:mt-0 flex-1 w-full max-w-md">
            {editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="w-full p-2 rounded text-black"
                />
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full p-2 rounded text-black"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleProfileUpdate}
                    disabled={saving}
                    className={`px-4 py-2 rounded ${
                      saving
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white transition`}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <motion.h2
                  className="text-3xl md:text-5xl font-bold text-white break-words"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {profile.username || 'Name not available'}
                </motion.h2>
                <motion.p
                  className="text-sm md:text-lg text-gray-400 mt-2 break-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {user.email}
                </motion.p>
                <motion.p
                  className="text-sm md:text-lg text-gray-400 mt-2 break-words"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {profile.phone || 'Phone not available'}
                </motion.p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 w-full md:w-auto"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-8 relative z-10">
          {['all', 'upcoming', 'past', 'cancelled'].map((key) => (
            <motion.button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all capitalize ${
                filter === key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  : 'bg-gray-800'
              } mb-2 md:mb-0`}
              whileHover={{ scale: 1.05 }}
            >
              {key}
            </motion.button>
          ))}
        </div>

        {/* Booking History */}
        <div className="space-y-6 mt-10 relative z-10 w-full max-w-6xl px-2 md:px-0">
          <motion.h3
            className="text-2xl md:text-4xl font-bold text-white text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Your Booking History
          </motion.h3>

          {filteredBookings.length === 0 ? (
            <p className="text-gray-400 text-center md:text-left">No bookings match your filter.</p>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  className="border-2 p-4 md:p-6 rounded-xl shadow-2xl bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <p>
                    <strong>Location:</strong> {booking.location}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>
                  <p>
                    <strong>From:</strong> {new Date(booking.pickupDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>To:</strong> {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status || 'active'}
                  </p>

                  {booking.status !== 'cancelled' && (
                    <motion.button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-4 bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full md:w-auto"
                      whileHover={{ scale: 1.05 }}
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
