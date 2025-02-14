import React, { useState,useEffect } from "react";
import { useLocation,useSearchParams  } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DIAQuote = () => {
  const location = useLocation();
 // const galk_uk = new URLSearchParams(location.search).get("galk");
  const [searchParams] = useSearchParams();  //Retrieve the Galk parameter from SitePage.jsx
  const galk = searchParams.get("galk"); // Retrieve the Galk parameter from the URL
  
  const siteData = location.state?.siteData;





  const [formData, setFormData] = useState({
    CustomerName: siteData?.CustomerName  ||"",
    Sitename:siteData?.Sitename || "",
    SiteID: siteData?.SiteID || "",
    RoomName: "",
    BuildingName: siteData?.BuildingName || "",
    StreetNumber: siteData?.StreetNumber || "",
    StreetName: "",
    City: siteData?.City || "",
    Zipcode: "",
    Country: siteData?.Country || "",
    //Galk: galk_uk ,
     Galk: siteData?.Galk || "",
    PortAccessSpeed: "",
    ContractTerm: "",
    Bandwidth: "",
    AccessProviders: [],
    Ipv4Subnet: "",
  });





  // Update Galk in state when it changes
  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     Galk: galk_uk, // Update only the Galk field
  //   }));
  // }, [galk_uk]);




  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    console.log("Form Data Before Validation:", formData);

    // Ensure required fields exist before calling .trim()
    if (!formData.CustomerName || formData.CustomerName.trim() === "") {
      newErrors.CustomerName = "Customer Name is required";
    }
    if (!formData.Zipcode || formData.Zipcode.toString().trim() === "") {
      newErrors.Zipcode = "Post Code is required";
    }

    // Validate Access Providers (Ensure at least one is selected)
    if (
      !Array.isArray(formData.AccessProviders) ||
      formData.AccessProviders.length === 0
    ) {
      newErrors.AccessProviders = "Please select at least one access provider.";
    }

    setErrors(newErrors);

    // If validation fails, stop form submission
    if (Object.keys(newErrors).length > 0) {
      console.error("Validation Errors:", newErrors);
      return;
    }

    try {
      const response = await fetch(
        // "http://localhost:5000/api/quotes/diaquotes",
        `http://localhost:5000/api/quotes/sites/dia/${siteData?.Galk}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            Zipcode: parseInt(formData.Zipcode, 10), // Ensure Zipcode is a number
            AccessProviders: formData.AccessProviders.filter(
              (provider) => provider
            ), // Remove falsy values
            Galk: galk, 
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Delay form reset to allow toast to be visible
        useEffect(() => {
          setFormData({
            CustomerName: siteData.CustomerName||"",
            Sitename: siteData.Sitename || "",
            SiteID: siteData.SiteID || "",
            RoomName: "",
            BuildingName:siteData.BuildingName || "",
            StreetNumber: siteData.StreetNumber || "",
            StreetName: "",
            City: siteData.City || "",
            Zipcode: siteData.Zipcode || "",
            Country: "",
            Galk: siteData.Galk || "",
            // Galk: "",
            PortAccessSpeed: "",
            ContractTerm: "",
            Bandwidth: "",
            AccessProviders: [], // Ensure it's an array
            Ipv4Subnet: "",
          });
        }, [siteData]); 

        console.log("Form submitted successfully:", result);
      } else {
        console.error("Server Error Response:", result);
        toast.error(`❌ Error: ${result.message || "Submission failed!"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const portSpeedOptions = ["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"];
  const contractTermOptions = [
    "12 Months",
    "24 Months",
    "36 Months",
    "48 Months",
    "60 Months",
  ];
  const bandwidthOptions = getBandwidthOptions(formData.portSpeed);
  const ipv4SubnetSizes = ["WAN IP Only", "/30", "/29", "/28", "/27", "/26"];

  const handlePortSpeedChange = (speed) => {
    setFormData((prevData) => {
      const newBandwidthOptions = getBandwidthOptions(speed);
      const newBandwidth = newBandwidthOptions[0] || ""; // Select first available bandwidth

      return {
        ...prevData,
        PortAccessSpeed: speed,
        Bandwidth: newBandwidthOptions[0] || "", // Auto-select first option
        //Bandwidth: newBandwidth, // Auto-select first option
      };
    });
  };

  const isRipePolicyRequired = ["/28", "/27", "/26"].includes(
    // formData.ipv4SubnetSize
    formData.Ipv4Subnet
  );

  // Handle form submission

  return (
    <div className="bg-white p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* A-End Section */}
        <div className="mb-6 border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-blue-600 text-sm">A</span>
            </div>
            <h3 className="text-lg font-semibold">A-End DIAQuote</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.CustomerName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 truncate`}
                placeholder="Enter value"
                value={formData.CustomerName}
                onChange={(e) => {
                  setFormData({ ...formData, CustomerName: e.target.value });
                  if (errors.CustomerName) {
                    setErrors({ ...errors, CustomerName: "" });
                  }
                }}
              />
              {errors.CustomerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.CustomerName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.Sitename}
                onChange={(e) =>
                  setFormData({ ...formData, Sitename: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.SiteID}
                onChange={(e) =>
                  setFormData({ ...formData, SiteID: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.RoomName}
                onChange={(e) =>
                  setFormData({ ...formData, RoomName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.BuildingName}
                onChange={(e) =>
                  setFormData({ ...formData, BuildingName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building/Street Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.StreetNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    StreetNumber: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.StreetName}
                onChange={(e) =>
                  setFormData({ ...formData, StreetName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town/City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.City}
                onChange={(e) =>
                  setFormData({ ...formData, City: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.Zipcode ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 truncate`}
                placeholder="Enter value"
                value={formData.Zipcode}
                onChange={(e) => {
                  setFormData({ ...formData, Zipcode: e.target.value });
                  if (errors.Zipcode) {
                    setErrors({ ...errors, Zipcode: "" });
                  }
                }}
              />
              {errors.Zipcode && (
                <p className="text-red-500 text-sm mt-1">{errors.Zipcode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.Country}
                onChange={(e) =>
                  setFormData({ ...formData, Country: e.target.value })
                }
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GALK
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.Galk}
                onChange={(e) =>
                  setFormData({ ...formData, Galk: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Port Speed and Contract Term Section */}
            <div className="flex space-x-6">
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
                      onClick={() =>
                        setFormData({ ...formData, ContractTerm: term })
                      }
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bandwidth Section */}
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bandwidth
              </label>
              <div className="grid grid-cols-5 gap-1">
                {getBandwidthOptions(formData.PortAccessSpeed).map(
                  (bandwidth) => (
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
                  )
                )}
              </div>
            </div>

            {/* IPv4 Subnet Size Section */}
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IPv4 Subnet Size
              </label>
              <div className="space-y-2">
                {/* <div className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block mb-2">
                  WAN IP Only
                </div> */}
                <div className="flex space-x-1">
                  {ipv4SubnetSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 text-sm rounded-md border ${
                        formData.Ipv4Subnet === size
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, Ipv4Subnet: size })
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Access Providers Section */}
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Providers
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  "BT Openreach",
                  "BT Wholesale",
                  "CityFibre",
                  "Colt",
                  "Sky",
                  "TalkTalk",
                  "Virgin Media",
                ].map((provider) => (
                  <label key={provider} className="flex items-center space-x-2">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={formData.AccessProviders.includes(provider)}
                        onChange={(e) => {
                          const updatedProviders = e.target.checked
                            ? [...formData.AccessProviders, provider]
                            : formData.AccessProviders.filter(
                                (p) => p !== provider
                              );

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
                <p className="text-red-500 text-sm mt-2">
                  {errors.AccessProviders}
                </p>
              )}
            </div>

            {/* Circuit Diversity Section */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">
                Circuit Diversity (Coming Soon)
              </h4>
              <p className="text-sm text-gray-600">
                This comes with two sets of network terminating equipment, each
                with a single diversity routed path which you can hope in
                different buildings. If something goes wrong on the primary
                path, you can manually switch traffic to the secondary one.
              </p>
            </div>

            {/* RIPE Policy Section */}
            <div
              className={`border rounded-lg p-4 ${
                !isRipePolicyRequired ? "opacity-50" : ""
              }`}
            >
              <h4 className="font-medium mb-2">RIPE Policy</h4>
              <p className="text-sm text-gray-600">
                I agree that because I am requesting 16 or more IPv4 addresses,
                I will comply with any RIPE policies including providing a
                justification for the use of the chosen subnet size.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DIAQuote;
