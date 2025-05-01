import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiUsers, FiShield, FiAward } from 'react-icons/fi';

function About() {
  const features = [
    'Premium vehicle selection',
    'Professional maintenance',
    'Flexible rental periods',
    '24/7 customer support',
    'Competitive pricing',
    'Convenient pickup locations'
  ];

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative py-20 sm:py-28 text-center bg-black bg-opacity-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">About DriveLuxe</h1>
        <p className="text-lg sm:text-xl text-gray-300">Your premium car rental service in Tamil Nadu</p>
      </motion.div>

      {/* Our Commitment Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-28">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-black bg-opacity-70 p-8 rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-gray-400 mb-8">
              DriveLuxe is committed to providing exceptional car rental services
              with a focus on luxury and reliability. Our fleet consists of
              well-maintained premium vehicles to ensure your comfort and safety.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <FiCheck className="text-green-400 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <motion.div 
        className="bg-black bg-opacity-80 py-16 sm:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Why Choose DriveLuxe?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 bg-gray-900 shadow-lg rounded-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FiUsers className="text-blue-400 text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted by Customers</h3>
              <p className="text-gray-300 text-center">Thousands of happy customers with high satisfaction.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-900 shadow-lg rounded-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FiShield className="text-green-400 text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable & Secure</h3>
              <p className="text-gray-300 text-center">Regular maintenance for your safety and comfort.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-gray-900 shadow-lg rounded-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <FiAward className="text-yellow-400 text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
              <p className="text-gray-300 text-center">Best luxury car rental service in Tamil Nadu.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Additional Information Section */}
      <motion.div className="py-16 sm:py-28 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Experience the DriveLuxe Difference</h2>
        <p className="text-gray-300 text-lg sm:text-xl mb-8">
          At DriveLuxe, we believe in providing more than just a car rental service. We deliver an experience.
          Whether you're exploring the vibrant cities of Tamil Nadu or heading on a long road trip, our premium
          selection ensures a smooth and stylish journey.
        </p>
        <p className="text-gray-300 text-lg sm:text-xl">
          With customer satisfaction as our top priority, we continue to innovate and enhance our services to
          make every trip an unforgettable one. Choose DriveLuxe, where luxury meets convenience.
        </p>
      </motion.div>
    </div>
  );
}

export default About;
