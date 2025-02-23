import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UKOfficeFormManual = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    CustomerName: "",
    Sitename: "",
    SiteID: "",
    RoomName: "",
    BuildingName: "",
    Street: "",
    City: "",
    Zipcode: "",
    Country: "",
    Galk: "",
    Notes: "",
    SiteStatus: false,
  });
  const [isHovered, setIsHovered] = useState(false);

  const [Error, setErrors] = useState({});
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle SiteStatus
  const toggleSiteStatus = () => {
    setFormData((prev) => ({ ...prev, SiteStatus: !prev.SiteStatus }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);

    // Validation
    const newErrors = {};
    if (!formData.CustomerName.trim()) {
      newErrors.CustomerName = "Office Name is required";
    }
    if (!formData.Zipcode.trim()) {
      newErrors.Zipcode = "Zip Code is required";
    }
    if (!formData.City.trim()) {
      newErrors.City = "City is required";
    }
    if (!formData.Country.trim()) {
      newErrors.Country = "Country is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/officedata/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Reset form data
        setFormData({
          CustomerName: "",
          Sitename: "",
          SiteID: "",
          RoomName: "",
          BuildingName: "",
          Street: "",
          City: "",
          Zipcode: "",
          Country: "",
          Galk: "",
          Notes: "",
          SiteStatus: false,
        });
      } else {
        toast.error(`❌ Error: ${result.message || "Submission failed!"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-center">
         UK Office Site Data Form
      </h2>
      <Link to="/office-form">
        <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
          For International Sites 
        </button>
      </Link>
      {/* Site Status Toggle */}
      <div className="flex items-center justify-center my-4 border border-green-600 rounded-lg overflow-hidden">
        <button
          className={`flex-1 px-4 py-2 text-center font-semibold ${
            !formData.SiteStatus
              ? "bg-gray-300 text-gray-600"
              : "bg-white text-gray-400"
          }`}
          onClick={() => setFormData({ ...formData, SiteStatus: false })}
        >
          Site Not Active
        </button>
        <button
          className={`flex-1 px-4 py-2 text-center font-semibold ${
            formData.SiteStatus
              ? "bg-green-600 text-white"
              : "bg-white text-gray-400"
          }`}
          onClick={() => setFormData({ ...formData, SiteStatus: true })}
        >
          Site Active
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Office Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            name="CustomerName"
            placeholder="Enter office name"
            value={formData.CustomerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Address */}

        {/* Sitename */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sitename
          </label>
          <input
            type="text"
            name="Sitename"
            placeholder="Enter Sitename"
            value={formData.Sitename}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* SiteId */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SiteID
          </label>
          <input
            type="text"
            name="SiteID"
            placeholder="Enter SiteID"
            value={formData.SiteID}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* RoomName */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Room Name
          </label>
          <input
            type="text"
            name="RoomName"
            placeholder="Enter RoomName"
            value={formData.RoomName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* BuildingName */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Building Name
          </label>
          <input
            type="text"
            name="BuildingName"
            placeholder="Enter BuildingName"
            value={formData.BuildingName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Street */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Street
          </label>
          <input
            type="text"
            name="Street"
            placeholder="Enter Street"
            value={formData.Street}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="City"
            placeholder="Enter city"
            value={formData.City}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* State */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            name="State"
            placeholder="Enter state"
            value={formData.State}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div> */}

        {/* Zipcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zip Code
          </label>
          <input
            type="text"
            name="Zipcode"
            placeholder="Enter zip code"
            value={formData.Zipcode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select a country</option>
            {[
              "Afghanistan",
              "Albania",
              "Algeria",
              "Andorra",
              "Angola",
              "Antigua and Barbuda",
              "Argentina",
              "Armenia",
              "Australia",
              "Austria",
              "Azerbaijan",
              "Bahamas",
              "Bahrain",
              "Bangladesh",
              "Barbados",
              "Belarus",
              "Belgium",
              "Belize",
              "Benin",
              "Bhutan",
              "Bolivia",
              "Bosnia and Herzegovina",
              "Botswana",
              "Brazil",
              "Brunei",
              "Bulgaria",
              "Burkina Faso",
              "Burundi",
              "Cabo Verde",
              "Cambodia",
              "Cameroon",
              "Canada",
              "Central African Republic",
              "Chad",
              "Chile",
              "China",
              "Colombia",
              "Comoros",
              "Congo (Congo-Brazzaville)",
              "Costa Rica",
              "Croatia",
              "Cuba",
              "Cyprus",
              "Czechia",
              "Democratic Republic of the Congo",
              "Denmark",
              "Djibouti",
              "Dominica",
              "Dominican Republic",
              "Ecuador",
              "Egypt",
              "El Salvador",
              "Equatorial Guinea",
              "Eritrea",
              "Estonia",
              "Eswatini (Swaziland)",
              "Ethiopia",
              "Fiji",
              "Finland",
              "France",
              "Gabon",
              "Gambia",
              "Georgia",
              "Germany",
              "Ghana",
              "Greece",
              "Grenada",
              "Guatemala",
              "Guinea",
              "Guinea-Bissau",
              "Guyana",
              "Haiti",
              "Honduras",
              "Hungary",
              "Iceland",
              "India",
              "Indonesia",
              "Iran",
              "Iraq",
              "Ireland",
              "Israel",
              "Italy",
              "Jamaica",
              "Japan",
              "Jordan",
              "Kazakhstan",
              "Kenya",
              "Kiribati",
              "Kuwait",
              "Kyrgyzstan",
              "Laos",
              "Latvia",
              "Lebanon",
              "Lesotho",
              "Liberia",
              "Libya",
              "Liechtenstein",
              "Lithuania",
              "Luxembourg",
              "Madagascar",
              "Malawi",
              "Malaysia",
              "Maldives",
              "Mali",
              "Malta",
              "Marshall Islands",
              "Mauritania",
              "Mauritius",
              "Mexico",
              "Micronesia",
              "Moldova",
              "Monaco",
              "Mongolia",
              "Montenegro",
              "Morocco",
              "Mozambique",
              "Myanmar (Burma)",
              "Namibia",
              "Nauru",
              "Nepal",
              "Netherlands",
              "New Zealand",
              "Nicaragua",
              "Niger",
              "Nigeria",
              "North Korea",
              "North Macedonia",
              "Norway",
              "Oman",
              "Pakistan",
              "Palau",
              "Panama",
              "Papua New Guinea",
              "Paraguay",
              "Peru",
              "Philippines",
              "Poland",
              "Portugal",
              "Qatar",
              "Romania",
              "Russia",
              "Rwanda",
              "Saint Kitts and Nevis",
              "Saint Lucia",
              "Saint Vincent and the Grenadines",
              "Samoa",
              "San Marino",
              "Sao Tome and Principe",
              "Saudi Arabia",
              "Senegal",
              "Serbia",
              "Seychelles",
              "Sierra Leone",
              "Singapore",
              "Slovakia",
              "Slovenia",
              "Solomon Islands",
              "Somalia",
              "South Africa",
              "South Korea",
              "South Sudan",
              "Spain",
              "Sri Lanka",
              "Sudan",
              "Suriname",
              "Sweden",
              "Switzerland",
              "Syria",
              "Tajikistan",
              "Tanzania",
              "Thailand",
              "Timor-Leste",
              "Togo",
              "Tonga",
              "Trinidad and Tobago",
              "Tunisia",
              "Turkey",
              "Turkmenistan",
              "Tuvalu",
              "Uganda",
              "Ukraine",
              "United Arab Emirates",
              "United Kingdom",
              "United States",
              "Uruguay",
              "Uzbekistan",
              "Vanuatu",
              "Vatican City",
              "Venezuela",
              "Vietnam",
              "Yemen",
              "Zambia",
              "Zimbabwe",
            ].map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {/* Galk */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Galk
          </label>
          <input
            type="text"
            name="Galk"
            placeholder="Enter Descrptions"
            value={formData.Galk}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <input
            type="text"
            name="Notes"
            placeholder="Enter Descrptions"
            value={formData.Notes}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Bulk Upload Button */}
      <Link to="/blulk-upload">
        <motion.div
          className="relative w-full"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.button
            className="w-full py-2 text-white bg-green-600 rounded-md shadow-lg transition-all duration-300 hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Bulk Data
          </motion.button>

          {/* Features Panel (Appears on Hover) */}
          {isHovered && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white shadow-xl rounded-lg p-3 text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <ul className="text-sm space-y-2">
                <li>✅ Supports .CSV format</li>
                <li>📂 Upload Multiple Sites for same company.</li>
                <li>🔍 Auto-validate before saving</li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </Link>
    </div>
  );
};

export default UKOfficeFormManual;
