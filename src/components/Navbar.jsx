import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/signin");
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-primary text-2xl font-bold flex items-center">
            <span className="text-3xl mr-2">🚗</span>
            DriveLuxe
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <Link to="/cars" className="text-gray-600 hover:text-primary">Cars</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" className="text-primary hover:text-primary-dark">
                Sign In
              </Link>
              <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
