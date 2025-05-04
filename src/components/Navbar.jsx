import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: icon library

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("token"));

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-primary text-2xl font-bold flex items-center">
          <span className="text-3xl mr-2">🚗</span> DriveLuxe
        </Link>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links */}
        <div className={`flex-col sm:flex sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 absolute sm:static top-[60px] left-0 w-full sm:w-auto bg-white sm:bg-transparent px-4 sm:px-0 py-4 sm:py-0 z-50 transition-all duration-300 ${isMenuOpen ? "flex" : "hidden"}`}>
          {/* Mobile Links: Auto-close on click */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-primary">Home</Link>
          <Link to="/cars" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-primary">Cars</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-primary">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-primary">Contact</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="text-primary hover:text-primary-dark">Sign In</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
