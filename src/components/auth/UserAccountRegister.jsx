import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAccountRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize toast notifications
  // toast.configure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/useraccount/register",
        formData
      );
console.log(response.data)
      // Show success toast
      toast.success("Account created successfully! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to login page after a short delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.message || "Registration failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {["name", "email", "phone", "password"].map((field, idx) => (
              <div key={idx}>
                <label htmlFor={field} className="sr-only">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            {loading ? "Registering..." : "Sign up"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-500 hover:text-blue-700">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};




export default UserAccountRegister;