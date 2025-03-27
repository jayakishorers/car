import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiSettings } from 'react-icons/fi';

const carsList = [
  {
    name: 'Ford Mustang',
    price: '29999',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1625231334168-35067f8853ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'BMW X5',
    price: '34999',
    seats: 7,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Mercedes C-Class',
    price: '17599',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Audi A4',
    price: '14999',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Range Rover Sport',
    price: '39999',
    seats: 7,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1620547316190-289b3899e010?w=600&auto=format&fit=crop&q=60'
  },
  {
    name: 'Porsche 911',
    price: '49999',
    seats: 2,
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&auto=format&fit=crop&q=60'
  }
];

function Cars() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Cars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Header Section */}
      <motion.div 
        className="relative z-10 text-center text-white mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold mb-4">Our Premium Fleet</h1>
        <p className="text-lg">Choose from our selection of luxury and premium cars</p>
      </motion.div>

      {/* Cars Grid */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {carsList.map((car, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative h-56">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Rs {car.price}/day
              </motion.div>
            </div>
            <div className="p-6 text-white">
              <h3 className="text-2xl font-semibold mb-4">{car.name}</h3>
              <div className="flex justify-between items-center mb-4 text-gray-300">
                <div className="flex items-center">
                  <FiUsers className="mr-2 text-gray-400" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center">
                  <FiSettings className="mr-2 text-gray-400" />
                  <span>{car.transmission}</span>
                </div>
              </div>
              <motion.button
                onClick={() => navigate('/')}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Cars;
