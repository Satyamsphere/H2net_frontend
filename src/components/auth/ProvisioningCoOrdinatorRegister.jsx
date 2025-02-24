import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProvisioningCoOrdinatorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/Provisioning/addnew', formData);
      console.log(response.data)
      
      if (response.status === 201) { // Assuming 201 is the status code for successful creation
        toast.success('productmanger account created successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        });

        // Optionally, you can navigate to another page after successful creation
        // navigate('/login');
      }
    } catch (error) {
      toast.error('Failed to create admin account. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      
      });
      console.error('Error creating admin account:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md animate-fade-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create ProvisioningCoOrdinator account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-h2net-blue focus:border-h2net-blue focus:z-10 sm:text-sm"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-h2net-blue focus:border-h2net-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-h2net-blue focus:border-h2net-blue focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-h2net-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-h2net-blue transition-all duration-300"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-h2net-blue hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default ProvisioningCoOrdinatorRegister;