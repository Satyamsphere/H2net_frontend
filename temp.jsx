
<Routes>
<Route
  path="/"
  element={
    isLoggedIn ? (
      <Navigate to="/dashboard/sites" replace />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
























const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current page is the dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a GET request to the logout API
      const response = await axios.get('http://localhost:5000/api/auth/useraccount/logout', {
        withCredentials: true, // Include cookies if needed
      });

      if (response.status === 200) {
        // Clear user session or token
        localStorage.removeItem('authToken'); // Example: Remove token from local storage
        setIsLoggedIn(false); // Update authentication state

        // Display success message
        toast.success('Logged out successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to the login page
        navigate('/login');
      }
    } catch (error) {
      // Handle logout error
      toast.error('Failed to logout. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Logout error:', error);
    }
  };

  // Render the dashboard-specific navbar
  if (isDashboard) {
    return (
      <nav className="bg-white shadow-md w-full fixed top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo on the left */}
            <Link to="/" className="text-h2net-blue font-bold text-2xl">
              <img
                src="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/h2net_logo_thajb4.png"
                alt="H2NET"
                className="h-10" // Adjust height as needed
              />
            </Link>

            {/* StatCards in the middle */}
            <div className="hidden lg:flex space-x-6 overflow-x-auto max-w-2xl xl:max-w-4xl">
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                icon="📊"
                title="Total number of quotes"
                value="266"
                subtitle="Count of all quotes"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                title="Total number of quotes"
                value="0"
                trend="-10,000%"
                subtitle="Since last month"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                title="Total number of quotes"
                value="10"
                trend="+1,000%"
                subtitle="Rolling month"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/home_navbar_zslm4w.png"
                title="Total number of sites"
                value="15"
                subtitle="Count of all sites"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/contact_nav_ionvhb.png"
                title="Total number of customers"
                value="5"
                subtitle="Count of all customers"
              />
            </div>

            {/* Hyperconnected ID and Logout button on the right */}
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-gray-600">HYPERCONNECTED ID: 28070001</span>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Render the default navbar for non-dashboard pages
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <Link to="/" className="text-h2net-blue font-bold text-2xl">
            <img
              src="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/h2net_logo_thajb4.png"
              alt="H2NET"
              className="h-10" // Adjust height as needed
            />
          </Link>

          {/* StatCards in the middle (only if not on an auth page) */}
          {!isAuthPage && (
            <div className="hidden lg:flex space-x-6 overflow-x-auto max-w-2xl xl:max-w-4xl">
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                icon="📊"
                title="Total number of quotes"
                value="266"
                subtitle="Count of all quotes"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                title="Total number of quotes"
                value="0"
                trend="-10,000%"
                subtitle="Since last month"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584874/shop_nav_ceip4c.png"
                title="Total number of quotes"
                value="10"
                trend="+1,000%"
                subtitle="Rolling month"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/home_navbar_zslm4w.png"
                title="Total number of sites"
                value="15"
                subtitle="Count of all sites"
              />
              <StatCard
                image="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/contact_nav_ionvhb.png"
                title="Total number of customers"
                value="5"
                subtitle="Count of all customers"
              />
            </div>
          )}

          {/* Login/Register buttons on the right (only if not on an auth page) */}
          {!isAuthPage && (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-h2net-blue hover:text-white hover:bg-h2net-blue rounded-lg transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-h2net-blue text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






















import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a GET request to the logout API
      const response = await axios.get('http://localhost:5000/api/auth/useraccount/logout', {
        withCredentials: true, // Include cookies if needed
      });

      if (response.status === 200) {
        // Clear user session or token
        localStorage.removeItem('token'); // Example: Remove token from local storage
        setIsLoggedIn(false); // Update authentication state

        // Display success message
        toast.success('Logged out successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to the login page
        navigate('/login');
      }
    } catch (error) {
      // Handle logout error
      toast.error('Failed to logout. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </div>
          <div className="flex items-center">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in (e.g., by verifying a token in local storage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="pt-16"> {/* Add padding to avoid navbar overlap */}
        <h1 className="text-3xl font-bold text-center mt-8">Welcome to the Dashboard</h1>
        <p className="text-center text-gray-600">You are logged in!</p>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />}
        />
      </Routes>
    </Router>
  );
};

export default App;