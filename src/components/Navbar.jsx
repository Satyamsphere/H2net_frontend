import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const StatCard = ({
  icon,
  image,
  imageAlt = "Stat Image",
  title,
  value,
  subtitle,
  trend,
}) => {
  const getTrendBackground = (trend) => {
    if (trend?.includes("-")) {
      return "bg-red-50";
    } else if (trend?.includes("+")) {
      return "bg-green-50";
    }
    return "";
  };

  return (
    <div className="flex items-start space-x-4 p-4 bg-white shadow-md rounded-lg">
      {/* Show image if available, otherwise show icon */}
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          className="w-12 h-12 object-cover rounded-md"
        />
      ) : (
        <div className="text-h2net-blue text-xl">{icon}</div>
      )}

      <div>
        <div className="text-sm text-gray-600 text-left">{title}</div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold">{value}</span>
          {trend && (
            <span
              className={`text-sm px-2 py-0.5 rounded ${getTrendBackground(
                trend
              )} ${trend.includes("-") ? "text-red-600" : "text-green-600"}`}
            >
              {trend}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 text-left">{subtitle}</div>
      </div>
    </div>
  );
};

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/userregister");
  };


  const isDashboard = location.pathname.startsWith("/dashboard");

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.get("http://localhost:5000/api/auth/useraccount/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Update the isLoggedIn state
      setIsLoggedIn(false);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isDashboard) {
    return (
      <nav className="bg-white shadow-md w-full">
        <div className="mx-auto px-4 py-3">
          <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Logo */}

            <Link
              to="/"
              className="text-h2net-blue font-bold text-2xl flex-shrink-0"
            >
              <img
                src="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/h2net_logo_thajb4.png"
                alt="H2NET"
                className="h-12 w-auto"
              />
            </Link>

            {/* Stats & Logout Button Wrapper */}
            <div className="flex flex-wrap gap-6 items-center justify-center flex-grow overflow-x-auto no-scrollbar px-4">
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
              {isLoggedIn && ( // Show logout button only if logged in
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Logout Button - Now properly aligned */}
            {/* {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-lg"
              >
                Logout
              </button>
            )} */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white">
      <div className="max-7xl mx-auto px-4 py-3">
        <div className="relative flex items-center justify-between px-6 py-4 bg-white shadow-md">
          {/* Logo */}
          <Link
            to="/"
            className="text-h2net-blue font-bold text-2xl flex-shrink-0"
          >
            <img
              src="https://res.cloudinary.com/dsdiqfrnj/image/upload/v1738584873/h2net_logo_thajb4.png"
              alt="H2NET"
              className="h-12 w-auto"
            />
          </Link>

          {/* Stats Wrapper */}
          <div className="flex flex-wrap gap-6 items-center justify-center flex-grow overflow-x-auto no-scrollbar px-4">
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
            <span className="text-gray-600">
              <button
                onClick={handleRegister}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Register
              </button>
            </span>
            <span className="text-gray-600">
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Login
              </button>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
