import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SiteDataPage = () => {
  const [siteData, setSiteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch Data
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
    fetchData();
  }, [fetchData]);

  // 🗑️ Delete Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this office data?")) {
      try {
        await axios.delete(`http://localhost:5000/api/officedata/delete/${id}`);
        alert("Office data deleted successfully!");
        fetchData();
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

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Office Data</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Site Name</th>
            <th className="border p-2">Site ID</th>
            <th className="border p-2">Room Name</th>
            <th className="border p-2">Building</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((site) => (
            <tr key={site._id} className="text-center border-b">
              <td className="border p-2">{site.OfficeName}</td>
              <td className="border p-2">{site.Sitename}</td>
              <td className="border p-2">{site.SiteID}</td>
              <td className="border p-2">{site.RoomName}</td>
              <td className="border p-2">{site.BuildingName}</td>
              <td className="border p-2">{site.City}</td>
              <td className="border p-2">{site.Country}</td>
              <td className="border p-2">{site.SiteStatus ? "✅ Active" : "❌ Inactive"}</td>
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
            {["OfficeName", "Sitename", "SiteID", "RoomName", "BuildingName", "Street", "City", "Zipcode", "Country", "Notes"].map(
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
