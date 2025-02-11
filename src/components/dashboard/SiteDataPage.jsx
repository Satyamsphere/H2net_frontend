import React, { useEffect, useState,useCallback } from "react";
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
    CustomerName: "",
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


  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});









  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
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
      await axios.put(`http://localhost:5000/api/officedata/update/${editingId}`, editFormData);
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
        (filters.SiteStatus === "" || site.SiteStatus === (filters.SiteStatus === "true")) &&
        (filters.CustomerName === "" || site.CustomerName.toLowerCase().includes(filters.CustomerName.toLowerCase())) &&
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
const csvHeader = "CustomerName,Sitename,SiteID,RoomName,BuildingName,Street,City,Zipcode,Country,Notes\n";
const csvRows = filteredData.map((quote)=>
        `${quote.CustomerName},${quote.Sitename},${quote.SiteID},${quote.RoomName},${quote.BuildingName},${quote.City},${quote.Zipcode},${quote.Country}`

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
              onChange={(e) => setFilters({ ...filters, SiteStatus: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {["CustomerName", "Sitename", "SiteID", "RoomName", "BuildingName", "Street", "City", "Zipcode", "Country", "Notes"].map(
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
              <td className="border p-2">{site.CustomerName}</td>
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

              <td className="border p-2">

              <button
                  onClick={() => handleEdit(site)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition mr-2"
                >
                  ✏️ Edit
                </button>




                <button
                  onClick={() => handleDelete(site._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  🗑️ Delete
                </button>
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
            {["CustomerName", "Sitename", "SiteID", "RoomName", "BuildingName", "Street", "City", "Zipcode", "Country", "Notes"].map(
              (key) => (
                <input
                  key={key}
                  name={key}
                  type="text"
                  placeholder={key}
                  value={editFormData[key] || ""}
                  onChange={handleEditChange}
                  className="p-2 border border-gray-300 rounded"
                />
              )
            )}
            <select
              name="SiteStatus"
              value={editFormData.SiteStatus}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded shadow mr-2"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded shadow"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
















    </div>
  );
};

export default SiteDataPage;
