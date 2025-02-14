import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PointToPointQuote = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams(); //Retrieve the Galk parameter from SitePage.jsx
  const galk = searchParams.get("galk"); // Retrieve the Galk parameter from the URL
 const siteData = location.state?.siteData;
  const [formData, setFormData] = useState({
    AEnd: {
      CustomerName: siteData?.CustomerName  ||"",
      Sitename:siteData?.Sitename || "",
      SiteID: siteData?.SiteID || "",
      RoomName: "",
      BuildingName: siteData?.BuildingName || "",
      StreetNumber: siteData?.StreetNumber || "",
      StreetName: "",
      City: siteData?.City || "",
      Galk: siteData?.Galk || "",
      Zipcode: siteData?.Zipcode ||"",
      Country: siteData?.Country || "",
    },
    BEnd: {
      CustomerName: siteData?.CustomerName  ||"",
      Sitename: "",
      SiteID: "",
      RoomName: "",
      BuildingName: "",
      StreetNumber: "",
      StreetName: "",
      City: "",
      Zipcode: "",
      Country: siteData?.Country || "",
    },

    PortAccessSpeed: "",
    ContractTerm: "",
    Bandwidth: "",
    AccessProviders: [],
    CircuitDiversity: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const portSpeedOptions = ["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"];
  const contractTermOptions = [
    "12 Months",
    "24 Months",
    "36 Months",
    "48 Months",
    "60 Months",
    "72 Months",
  ];
  const accessProvidersList = [
    "BT Openreach",
    "BT Wholesale",
    "CityFibre",
    "Colt",
    "Sky",
    "TalkTalk",
    "Virgin Media",
  ];

  const getBandwidthOptions = (portSpeed) => {
    let min, max, unit;

    switch (portSpeed) {
      case "100 Mbps":
        min = 10;
        max = 100;
        unit = "Mbps";
        break;
      case "1 Gbps":
        min = 100;
        max = 1000;
        unit = "Mbps";
        break;
      case "10 Gbps":
        min = 1;
        max = 10;
        unit = "Gbps";
        break;
      case "100 Gbps":
        min = 10;
        max = 100;
        unit = "Gbps";
        break;
      default:
        return [];
    }

    return Array.from({ length: 10 }, (_, i) => {
      const value = min + (i * (max - min)) / 9; // Distribute values evenly
      return `${value} ${unit}`;
    });
  };

  const handleChange = (e, section, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: e.target.value,
      },
    }));
  };

  const handlePortSpeedChange = (speed) => {
    setFormData((prevData) => ({
      ...prevData,
      PortAccessSpeed: speed,
      Bandwidth: "", // Reset bandwidth on speed change
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const requestData = {
      ...formData,
      AEnd: { ...formData.AEnd, Zipcode: String(formData.AEnd.Zipcode) },
      BEnd: { ...formData.BEnd, Zipcode: String(formData.BEnd.Zipcode) },
      Galk: galk, // Include the Galk value
    };

    try {
      const res = await axios.post(
        // "http://localhost:5000/api/quotes/ppquotes",
        `http://localhost:5000/api/quotes/sites/p2p/${siteData?.Galk}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setResponse(res.data);
      console.log(res);

      // Show success toast message
      toast.success("Data submitted successfully!", {
        position: "top-center",
        autoClose: 3000, // 3 seconds
      });
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "An error occurred" });

      // Show error toast message
      toast.error("Submission failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-4 bg-white shadow rounded"
    >
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        {["AEnd", "BEnd"].map((end) => (
          <div key={end} className="p-4 border rounded">
            <h2 className="font-bold text-lg mb-2">
              {end.replace("End", "-End")}
            </h2>
            {Object.keys(formData[end] || {}).map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                {field === "Country" ? (
                  // Render a dropdown for the Country field
                  <select
                    value={formData[end]?.[field] || ""}
                    onChange={(e) => handleChange(e, end, field)}
                    className="w-full p-2 border rounded"
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
                ) : (
                  // Render a text input for other fields
                  <input
                    type="text"
                    value={formData[end]?.[field] || ""}
                    onChange={(e) => handleChange(e, end, field)}
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex space-x-6 mt-4">
        {/* Port Speed Section */}
        <div className="flex-1 border rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Port or Access Speed
          </label>
          <div className="flex space-x-1">
            {portSpeedOptions.map((speed) => (
              <button
                key={speed}
                type="button"
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.PortAccessSpeed === speed
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handlePortSpeedChange(speed)}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Contract Term Section */}
        <div className="flex-1 border rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contract Term
          </label>
          <div className="flex space-x-1">
            {contractTermOptions.map((term) => (
              <button
                key={term}
                type="button"
                className={`px-4 py-2 text-sm rounded-md border ${
                  formData.ContractTerm === term
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setFormData({ ...formData, ContractTerm: term })}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bandwidth Section */}
      <div className="border rounded-lg p-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bandwidth
        </label>
        <div className="grid grid-cols-5 gap-1">
          {getBandwidthOptions(formData.PortAccessSpeed).map((bandwidth) => (
            <button
              key={bandwidth}
              type="button"
              className={`px-4 py-2 text-sm rounded-md border ${
                formData.Bandwidth === bandwidth
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  Bandwidth: bandwidth,
                }))
              }
            >
              {bandwidth}
            </button>
          ))}
        </div>
      </div>

      {/* Access Providers Section */}
      <div className="border rounded-lg p-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Access Providers
        </label>
        <div className="grid grid-cols-2 gap-4">
          {accessProvidersList.map((provider) => (
            <label key={provider} className="flex items-center space-x-2">
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={formData.AccessProviders.includes(provider)}
                  onChange={(e) => {
                    const updatedProviders = e.target.checked
                      ? [...formData.AccessProviders, provider]
                      : formData.AccessProviders.filter((p) => p !== provider);
                    setFormData({
                      ...formData,
                      AccessProviders: updatedProviders,
                    });

                    if (errors.AccessProviders) {
                      setErrors({ ...errors, AccessProviders: "" });
                    }
                  }}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <div
                  className={`toggle-label block overflow-hidden h-6 rounded-full ${
                    formData.AccessProviders.includes(provider)
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                ></div>
              </div>
              <span className="text-gray-700">{provider}</span>
            </label>
          ))}
        </div>
        {errors.AccessProviders && (
          <p className="text-red-500 text-sm mt-2">{errors.AccessProviders}</p>
        )}
      </div>

      {/* Circuit Diversity Section */}
      <div className="border rounded-lg p-4 mt-4">
        <label className="flex items-center space-x-2">
          <span>Circuit Diversity (Coming Soon)</span>
          <p>
            This comes with two sets of network terminating equipment,each with
            a single diversely routed path which you can house in differnt
            buildings. If something goes wrong on the primary path, you can
            manually switch traffic to the secondary one.
          </p>
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 p-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Getting Quote..." : "Get Quote"}
      </button>
    </form>
  );
};

export default PointToPointQuote;
