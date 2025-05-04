// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard'; // ✅ Import Dashboard
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add this */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
