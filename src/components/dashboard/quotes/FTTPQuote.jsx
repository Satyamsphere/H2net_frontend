import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    CustomerName: "",
    Sitename: "",
    SiteID: "",
    RoomName: "",
    Zipcode: "",
    Country: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/quotes/fttpquotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          CustomerName: "",
          Sitename: "",
          SiteID: "",
          RoomName: "",
          Zipcode: "",
          Country: "",
        });
        console.log("Form submitted:", result);
      } else {
        toast.error("⚠️ Submission failed. Please check your input.", {
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
    <div className="bg-white p-6 rounded-lg">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Customer Name"
                value={formData.CustomerName}
                onChange={(e) => setFormData({ ...formData, CustomerName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Site Name"
                value={formData.Sitename}
                onChange={(e) => setFormData({ ...formData, Sitename: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Site ID"
                value={formData.SiteID}
                onChange={(e) => setFormData({ ...formData, SiteID: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Room Name"
                value={formData.RoomName}
                onChange={(e) => setFormData({ ...formData, RoomName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter Zip Code"
                value={formData.Zipcode}
                onChange={(e) => setFormData({ ...formData, Zipcode: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.Country}
                onChange={(e) => setFormData({ ...formData, Country: e.target.value })}
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
            ].map(
                  (country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
