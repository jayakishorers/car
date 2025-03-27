import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative py-16 text-center bg-black bg-opacity-50"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with us for any inquiries or support</p>
        </div>
      </motion.div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="bg-black bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-8 text-white relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            {submitted ? (
              <motion.div
                className="text-center bg-green-600 text-white p-6 rounded-md shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg font-semibold">Thank you! Your message has been sent successfully.</p>
                <p>We will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
          
          <motion.div className="space-y-6 bg-black bg-opacity-70 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="flex items-center"><FiPhone className="text-primary text-xl mr-4" /><p>+91 1234567890</p></div>
            <div className="flex items-center"><FiMail className="text-primary text-xl mr-4" /><p>info@driveluxe.com</p></div>
            <div className="flex items-center"><FiMapPin className="text-primary text-xl mr-4" /><p>123 Car Street, Chennai, Tamil Nadu</p></div>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com" className="text-xl text-gray-400 hover:text-white"><FaFacebook /></a>
              <a href="https://www.twitter.com" className="text-xl text-gray-400 hover:text-white"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="text-xl text-gray-400 hover:text-white"><FaInstagram /></a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;
