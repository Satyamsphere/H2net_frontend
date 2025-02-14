import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SiteDataPage = () => {
  const handleDiaQuote = async (galk) => {
    try {
      const siteData = {
        CustomerName: site.CustomerName,
        Sitename: site.Sitename,
        SiteID: site.SiteID,
        BuildingName: site.BuildingName,
        Street: site.Street,
        City: site.City,
        Zipcode: site.Zipcode,
        Galk: galk,
      };
  
      // Save to localStorage before navigating
      localStorage.setItem("siteData", JSON.stringify(siteData));
  
      navigate(`/dashboard/quotes/dia?galk=${galk}`, { state: { siteData } });
  
    } catch (error) {
      console.error("Error navigating to DIA Quotes page:", error);
      alert("Failed to navigate to DIA Quotes page.");
    }
  };
  

  import React, { useState, useEffect } from 'react';
  import { useSearchParams, useLocation } from 'react-router-dom';
  
  const Diaquotes = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const galk = searchParams.get("galk");
  
    // Try getting siteData from navigation state or localStorage
    let siteData = location.state?.siteData;
    if (!siteData) {
      const storedData = localStorage.getItem("siteData");
      if (storedData) {
        siteData = JSON.parse(storedData);
      }
    }
  
    const [formData, setFormData] = useState({
      CustomerName: siteData?.CustomerName || "",
      Sitename: siteData?.Sitename || "",
      SiteID: siteData?.SiteID || "",
      RoomName: "",
      BuildingName: siteData?.BuildingName || "",
      StreetNumber: siteData?.Street || "",
      StreetName: "",
      City: siteData?.City || "",
      Zipcode: siteData?.Zipcode || "",
      Country: "",
      Galk: galk || siteData?.Galk || "",
      PortAccessSpeed: "",
      ContractTerm: "",
      Bandwidth: "",
      AccessProviders: [],
      Ipv4Subnet: "",
    });
  
    useEffect(() => {
      if (siteData) {
        setFormData((prevData) => ({
          ...prevData,
          CustomerName: siteData.CustomerName,
          Sitename: siteData.Sitename,
          SiteID: siteData.SiteID,
          BuildingName: siteData.BuildingName,
          StreetNumber: siteData.Street,
          City: siteData.City,
          Zipcode: siteData.Zipcode,
          Galk: siteData.Galk,
        }));
      }
    }, [siteData]);
  
    return (
      <div>
        <h1>DIA Quotes</h1>
        <form>
          <input
            type="text"
            placeholder="Customer Name"
            value={formData.CustomerName}
            onChange={(e) => setFormData({ ...formData, CustomerName: e.target.value })}
          />
          {/* Add other form fields here */}
        </form>
      </div>
    );
  };
  
  export default Diaquotes;
  


  import React from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Site = ({ site }) => {
    import React, { useState, useEffect } from 'react';
    import { useSearchParams, useLocation } from 'react-router-dom';
    
    const Diaquotes = () => {
      const [searchParams] = useSearchParams();
      const location = useLocation();
      const galk = searchParams.get("galk"); // Retrieve the Galk parameter from the URL
      const siteData = location.state?.siteData; // Retrieve the site data from the navigation state
    
      const [formData, setFormData] = useState({
        CustomerName: siteData?.CustomerName || "",
        Sitename: siteData?.Sitename || "",
        SiteID: siteData?.SiteID || "",
        RoomName: "",
        BuildingName: siteData?.BuildingName || "",
        StreetNumber: siteData?.Street || "", // Assuming "Street" is mapped to "StreetNumber"
        StreetName: "",
        City: siteData?.City || "",
        Zipcode: siteData?.Zipcode || "",
        Country: "",
        Galk: galk || "", // Use the Galk value from the URL
        PortAccessSpeed: "",
        ContractTerm: "",
        Bandwidth: "",
        AccessProviders: [],
        Ipv4Subnet: "",
      });
    
      useEffect(() => {
        // If siteData is available, update the form data
        if (siteData) {
          setFormData((prevData) => ({
            ...prevData,
            CustomerName: siteData.CustomerName,
            Sitename: siteData.Sitename,
            SiteID: siteData.SiteID,
            BuildingName: siteData.BuildingName,
            StreetNumber: siteData.Street, // Map "Street" to "StreetNumber"
            City: siteData.City,
            Zipcode: siteData.Zipcode,
            Galk: siteData.Galk,
          }));
        }
      }, [siteData]);
    
      return (
        <div>
          <h1>DIA Quotes</h1>
          <form>
            <input
              type="text"
              placeholder="Customer Name"
              value={formData.CustomerName}
              onChange={(e) => setFormData({ ...formData, CustomerName: e.target.value })}
            />
            {/* Add other form fields here */}
          </form>
        </div>
      );
    };
    
    export default Diaquotes;















    const navigate = useNavigate();
  
    const handleDiaQuote = async (galk) => {
      try {
        // Prepare the data to be passed to the DIA Quotes page
        const siteData = {
          CustomerName: site.CustomerName,
          Sitename: site.Sitename,
          SiteID: site.SiteID,
          BuildingName: site.BuildingName,
          Street: site.Street,
          City: site.City,
          Zipcode: site.Zipcode,
          Galk: galk, // Include the Galk value
        };
  
        // Redirect to the DIA Quotes page with the site data embedded in the state
        navigate(`/dashboard/quotes/dia?galk=${galk}`, { state: { siteData } });
  
      } catch (error) {
        console.error("Error navigating to DIA Quotes page:", error);
        alert("Failed to navigate to DIA Quotes page.");
      }
    };
  
    return (
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => handleDiaQuote(site.Galk)}
        >
          DIA Quotes
        </button>
      </div>
    );
  };
  
  export default Site;
























  const [siteData, setSiteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Hide filters initially
  const [filters, setFilters] = useState({
    SiteStatus: "", // Default value (true/false)
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
  });

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/officedata/sitedata"
      );
      setSiteData(response.data.data);
      setFilteredData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching site data:", error);
      setError("Failed to fetch site data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(); // ✅ Call fetchData when component mounts
  }, [fetchData]);

  // 🗑️ Handle DELETE Request
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this office data?")) {
      try {
        await axios.delete(`http://localhost:5000/api/officedata/delete/${id}`);
        alert("Office data deleted successfully!");
        fetchData(); // ✅ Now fetchData is accessible inside handleDelete
      } catch (error) {
        console.error("Error deleting office data:", error);
        alert("Failed to delete office data.");
      }
    }
  };

  // ✏️ Start Editing
  const handleEdit = (site) => {
    setEditingId(site._id);
    setEditFormData(site);
  };

  // 📝 Update Field Changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // ✅ Save Updates
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/officedata/update/${editingId}`,
        editFormData
      );
      alert("Office data updated successfully!");
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating office data:", error);
      alert("Failed to update office data.");
    }
  };

  //to filter the data
  const applyFilters = () => {
    let filtered = siteData.filter((site) => {
      return (
        (filters.SiteStatus === "" ||
          site.SiteStatus?.toString() === filters.SiteStatus) &&
        (filters.CustomerName === "" ||
          (site.CustomerName?.toLowerCase() || "").includes(
            filters.CustomerName.toLowerCase()
          )) &&
        (filters.Sitename === "" ||
          (site.Sitename?.toLowerCase() || "").includes(
            filters.Sitename.toLowerCase()
          )) &&
        (filters.SiteID === "" ||
          (site.SiteID?.toLowerCase() || "").includes(
            filters.SiteID.toLowerCase()
          )) &&
        (filters.RoomName === "" ||
          (site.RoomName?.toLowerCase() || "").includes(
            filters.RoomName.toLowerCase()
          )) &&
        (filters.BuildingName === "" ||
          (site.BuildingName?.toLowerCase() || "").includes(
            filters.BuildingName.toLowerCase()
          )) &&
        (filters.Street === "" ||
          (site.Street?.toLowerCase() || "").includes(
            filters.Street.toLowerCase()
          )) &&
        (filters.City === "" ||
          (site.City?.toLowerCase() || "").includes(
            filters.City.toLowerCase()
          )) &&
        (filters.Zipcode === "" ||
          (site.Zipcode?.toString() || "").includes(filters.Zipcode)) &&
        (filters.Country === "" ||
          (site.Country?.toLowerCase() || "").includes(
            filters.Country.toLowerCase()
          )) &&
        (filters.Galk === "" ||
          (site.Galk !== undefined &&
            site.Galk.toString()
              .toLowerCase()
              .includes(filters.Galk.toLowerCase()))) &&
        (filters.Notes === "" ||
          (site.Notes?.toLowerCase() || "").includes(
            filters.Notes.toLowerCase()
          ))
      );
    });

    setFilteredData(filtered);
  };

  //to download csv file from download button

  const downloadCSV = () => {
    const csvHeader =
      "CustomerName,Sitename,SiteID,RoomName,BuildingName,Street,City,Zipcode,Country,Notes\n";
    const csvRows = filteredData
      .map(
        (quote) =>
          `${quote.CustomerName},${quote.Sitename},${quote.SiteID},${quote.RoomName},${quote.BuildingName},${quote.City},${quote.Zipcode},${quote.Country}`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle DIA Quote
  const handleDiaQuote = async (galk) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quotes/sites/dia/${galk}`);
      console.log("DIA Quote Response:", response.data);
      alert("DIA Quote fetched successfully!");
    } catch (error) {
      console.error("Error fetching DIA Quote:", error);
      alert("Failed to fetch DIA Quote.");
    }
  };

  // Handle FTTP Quote
  const handleFttpQuote = async (galk) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quotes/sites/fttp/${galk}`);
      console.log("FTTP Quote Response:", response.data);
      alert("FTTP Quote fetched successfully!");
    } catch (error) {
      console.error("Error fetching FTTP Quote:", error);
      alert("Failed to fetch FTTP Quote.");
    }
  };

  // Handle P2P Quote
  const handleP2pQuote = async (galk) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quotes/sites/p2p/${galk}`);
      console.log("P2P Quote Response:", response.data);
      alert("P2P Quote fetched successfully!");
    } catch (error) {
      console.error("Error fetching P2P Quote:", error);
      alert("Failed to fetch P2P Quote.");
    }
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
      // Use the correct galk value in the API endpoint URL
      const response = await fetch(
        `http://localhost:5000/api/quotes/sites/dia/${galk}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            Zipcode: parseInt(formData.Zipcode, 10), // Ensure Zipcode is a number
            AccessProviders: formData.AccessProviders.filter(
              (provider) => provider
            ), // Remove falsy values
            Galk: galk, // Ensure the Galk value is included in the form data
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
        setTimeout(() => {
          setFormData({
            CustomerName: "",
            Sitename: "",
            SiteID: "",
            RoomName: "",
            BuildingName: "",
            StreetNumber: "",
            StreetName: "",
            City: "",
            Zipcode: "",
            Country: "",
            Galk: galk, // Retain the Galk value for future submissions
            PortAccessSpeed: "",
            ContractTerm: "",
            Bandwidth: "",
            AccessProviders: [], // Reset to an empty array
            Ipv4Subnet: "",
          });
        }, 1000); // ⏳ Delay reset by 1 second to allow toast visibility
  
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












  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/office-form")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow flex items-center"
        >
          ➕ Add Site
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow flex items-center"
        >
          {showFilters ? "❌ Hide Filters" : "🔍 Show Filters"}
        </button>
        <button
          onClick={downloadCSV}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Download
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow flex items-center"
        >
          🔄 Refresh
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/dashboard/quotes/dia")}
        >
          DIA Quotes
        </button>

        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => navigate("/dashboard/quotes/fttp")}
        >
          FTTP Quotes
        </button>

        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
          onClick={() => navigate("/dashboard/quotes/p2p")}
        >
          P2P Quotes
        </button>
      </div>

      {/* Filters - Show Only If Button Clicked */}
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-bold mb-2">Filter Options</h3>
          <div className="grid grid-cols-3 gap-4">
            <select
              value={filters.SiteStatus}
              onChange={(e) =>
                setFilters({ ...filters, SiteStatus: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {[
              "CustomerName",
              "Sitename",
              "SiteID",
              "RoomName",
              "BuildingName",
              "Street",
              "City",
              "Zipcode",
              "Country",
              "Galk",
              "Notes",
            ].map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={filters[key]}
                onChange={(e) =>
                  setFilters({ ...filters, [key]: e.target.value })
                }
                className="p-2 border border-gray-300 rounded"
              />
            ))}
          </div>
          <button
            onClick={applyFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            ✅ Apply Filters
          </button>
        </div>
      )}

      {/* Data Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Site Name</th>
            <th className="border p-2">Site ID</th>
            <th className="border p-2">Room Name</th>
            <th className="border p-2">Building</th>
            <th className="border p-2">Street</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Zipcode</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Galk</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Operation</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((site, index) => (
            <tr key={site._id || index} className="text-center border-b">
              <td className="border p-2">{site.CustomerName}</td>
              <td className="border p-2">{site.Sitename}</td>
              <td className="border p-2">{site.SiteID}</td>
              <td className="border p-2">{site.RoomName}</td>
              <td className="border p-2">{site.BuildingName}</td>
              <td className="border p-2">{site.Street}</td>
              <td className="border p-2">{site.City}</td>
              <td className="border p-2">{site.Zipcode}</td>
              <td className="border p-2">{site.Country}</td>
              <td className="border p-2">{site.Galk}</td>
              <td className="border p-2 font-bold text-white">
                <span className={site.SiteStatus ? "" : ""}>
                  {site.SiteStatus ? "✅" : "❌"}
                </span>
              </td>

              <td className="border p-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(site)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(site._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    🗑️ Delete
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => handleDiaQuote(site.Galk)}
                  >
                    DIA Quotes
                  </button>

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => handleFttpQuote(site.Galk)}
                  >
                    FTTP Quotes
                  </button>

                  <button
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
                    onClick={() => handleP2pQuote(site.Galk)}
                  >
                    P2P Quotes
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form - Only Show When Editing */}
      {editingId && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Edit Office Data</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "CustomerName",
              "Sitename",
              "SiteID",
              "RoomName",
              "BuildingName",
              "Street",
              "City",
              "Zipcode",
              "Country",
              "Galk",
              "Notes",
            ].map((key) => (
              <input
                key={key}
                name={key}
                type="text"
                placeholder={key}
                value={editFormData[key] || ""}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
            ))}
            <select
              name="SiteStatus"
              value={editFormData.SiteStatus}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 rounded