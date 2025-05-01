import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiPhone, FiClipboard, FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="bg-white w-full max-w-md sm:max-w-xl p-6 sm:p-10 rounded-xl shadow-xl text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FiCheckCircle className="text-green-500 text-5xl sm:text-6xl mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Booking Request Received!
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Thank you for choosing <span className="text-primary font-semibold">DriveLuxe</span>. Your booking request has been successfully submitted.
        </p>
        <p className="text-gray-700 font-medium mt-4 text-sm sm:text-base">
          Our team will contact you shortly for further information and confirmation.
        </p>

        {/* Next Steps */}
        <div className="mt-6 text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
            What's Next?
          </h3>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-center text-gray-700">
              <FiPhone className="text-primary mr-3 text-lg sm:text-xl" />
              Our team will call you on your provided phone number.
            </li>
            <li className="flex items-center text-gray-700">
              <FiClipboard className="text-primary mr-3 text-lg sm:text-xl" />
              We'll confirm your booking details.
            </li>
            <li className="flex items-center text-gray-700">
              <FiCreditCard className="text-primary mr-3 text-lg sm:text-xl" />
              Information about payment and pickup will be provided.
            </li>
          </ul>
        </div>

        {/* Go Back Button */}
        <button 
          className="mt-8 w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}

export default BookingSuccess;
