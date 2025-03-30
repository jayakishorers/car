import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", // Changed from username to email (backend expects email)
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const userData = await response.json();
      toast.success("Login successful!");
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-600 relative">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1920&q=80"
        alt="Luxury Car"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}

      {/* Login Form with Glassmorphism Effect */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 shadow-lg rounded-lg max-w-md w-full text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-white bg-transparent rounded-md focus:ring-2 focus:ring-primary text-white placeholder-gray-300"
            required
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-white bg-transparent rounded-md focus:ring-2 focus:ring-primary text-white placeholder-gray-300"
            required
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default SignIn;
