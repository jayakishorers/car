// App.js (modified version)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard';
import SecretPage from './pages/SecretPage'; // ⬅️ Import
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/secret";

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/secret" element={<SecretPage />} /> {/* ⬅️ Add secret page route */}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
