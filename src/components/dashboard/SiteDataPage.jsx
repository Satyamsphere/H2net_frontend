import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SiteDataPage = () => {

  const [siteData, setSiteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Hide filters initially
  const [filters, setFilters] = useState({
    SiteStatus: "", // Default value (true/false)
    OfficeName: "",
    Sitename: "",
    SiteID: "",
    RoomName: "",
    BuildingName: "",
    Street: "",
    City: "",
    Zipcode: "",
    Country: "",
    Notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/officedata/sitedata");
        setSiteData(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching site data:", error);
        setError("Failed to fetch site data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
//to filter the data 
  const applyFilters = () => {
    let filtered = siteData.filter((site) => {
      return (
        (filters.SiteStatus === "" || site.SiteStatus === (filters.SiteStatus === "true")) &&
        (filters.OfficeName === "" || site.OfficeName.toLowerCase().includes(filters.OfficeName.toLowerCase())) &&
        (filters.Sitename === "" || site.Sitename.toLowerCase().includes(filters.Sitename.toLowerCase())) &&
        (filters.SiteID === "" || site.SiteID.toLowerCase().includes(filters.SiteID.toLowerCase())) &&
        (filters.RoomName === "" || site.RoomName.toLowerCase().includes(filters.RoomName.toLowerCase())) &&
        (filters.BuildingName === "" || site.BuildingName.toLowerCase().includes(filters.BuildingName.toLowerCase())) &&
        (filters.Street === "" || site.Street.toLowerCase().includes(filters.Street.toLowerCase())) &&
        (filters.City === "" || site.City.toLowerCase().includes(filters.City.toLowerCase())) &&
        (filters.Zipcode === "" || site.Zipcode.toString().includes(filters.Zipcode)) &&
        (filters.Country === "" || site.Country.toLowerCase().includes(filters.Country.toLowerCase())) &&
        (filters.Notes === "" || site.Notes.toLowerCase().includes(filters.Notes.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };


 //to download csv file from download button

const downloadCSV =()=>{
const csvHeader = "OfficeName,Sitename,SiteID,RoomName,BuildingName,Street,City,Zipcode,Country,Notes\n";
const csvRows = filteredData.map((quote)=>
        `${quote.OfficeName},${quote.Sitename},${quote.SiteID},${quote.RoomName},${quote.BuildingName},${quote.City},${quote.Zipcode},${quote.Country}`

).join("\n");

const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "quotes.csv";
a.click();
URL.revokeObjectURL(url);

}












  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/office-form")} className="px-4 py-2 bg-blue-500 text-white rounded shadow flex items-center">
          ➕ Add Site
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-500 text-white rounded shadow flex items-center">
          {showFilters ? "❌ Hide Filters" : "🔍 Show Filters"}
        </button>
        <button onClick={downloadCSV} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Download
          </button>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-yellow-500 text-white rounded shadow flex items-center">
          🔄 Refresh
        </button>
      </div>

      {/* Filters - Show Only If Button Clicked */}
      {showFilters && (
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-bold mb-2">Filter Options</h3>
          <div className="grid grid-cols-3 gap-4">
            <select
              value={filters.SiteStatus}
              onChange={(e) => setFilters({ ...filters, SiteStatus: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {["OfficeName", "Sitename", "SiteID", "RoomName", "BuildingName", "Street", "City", "Zipcode", "Country", "Notes"].map(
              (key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="p-2 border border-gray-300 rounded"
                />
              )
            )}
          </div>
          <button onClick={applyFilters} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow">
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
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((site, index) => (
            <tr key={site._id || index} className="text-center border-b">
              <td className="border p-2">{site.OfficeName}</td>
              <td className="border p-2">{site.Sitename}</td>
              <td className="border p-2">{site.SiteID}</td>
              <td className="border p-2">{site.RoomName}</td>
              <td className="border p-2">{site.BuildingName}</td>
              <td className="border p-2">{site.Street}</td>
              <td className="border p-2">{site.City}</td>
              <td className="border p-2">{site.Zipcode}</td>
              <td className="border p-2">{site.Country}</td>
              <td className="border p-2 font-bold text-white">
                <span className={site.SiteStatus ? "" : ""}>
                  {site.SiteStatus ? "✅" : "❌"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteDataPage;
