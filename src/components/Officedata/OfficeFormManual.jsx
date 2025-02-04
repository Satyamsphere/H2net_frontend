import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
const OfficeFormManual = () => {

  //to submit the data
  const [formData, setFormData] = useState({
    OfficeName: "",
    OfficeAddress: "",
    City: "",
    State: "",
    Zipcode: "",
    Contact: "",
    Country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/officedata/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setFormData({
          OfficeName: "",
          OfficeAddress: "",
          City: "",
          State: "",
          Zipcode: "",
          Contact: "",
          Country: "",
        });
      } else {
        toast.error(`❌ Error: ${result.message || "Submission failed!"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer /> {/* Toast Notification Container */}
      
      <h2 className="text-2xl font-bold mb-6 text-center">Form for Office Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="OfficeName" className="block text-sm font-medium text-gray-700">Office Name</label>
          <input
            type="text"
            id="OfficeName"
            name="OfficeName"
            placeholder="Enter office name"
            value={formData.OfficeName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="OfficeAddress" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="OfficeAddress"
            name="OfficeAddress"
            placeholder="Enter address"
            value={formData.OfficeAddress}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="City" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="City"
            name="City"
            placeholder="Enter city"
            value={formData.City}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="State" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            id="State"
            name="State"
            placeholder="Enter state"
            value={formData.State}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="Zipcode" className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            id="Zipcode"
            name="Zipcode"
            placeholder="Enter zip code"
            value={formData.Zipcode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="Contact" className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            id="Contact"
            name="Contact"
            placeholder="Enter contact number"
            value={formData.Contact}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
      <Link to="/blulk-upload" className="font-medium text-h2net-blue hover:text-blue-500">
      <div className="mt-6">
        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Bulk Upload Data (.CSV)
        </button>
      </div>
      </Link>
    </div>
  );
};

export default OfficeFormManual;
