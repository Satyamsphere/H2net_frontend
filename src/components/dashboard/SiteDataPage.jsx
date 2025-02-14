import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";


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
    Galk: "",
    Notes: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
    try {
      await axios.delete(`http://localhost:5000/api/officedata/delete/${id}`);
     
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting office data:", error);
      alert("Failed to delete office data.");
    } finally {
      setDeleteModalOpen(false); // Close the modal after deletion
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
      //alert("Office data updated successfully!");
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
  // Handle DIA Quote for selected site only via galk id
  const handleDiaQuote = async (site) => {
    try {
      if (!site) {
        //alert("Site data is unavailable.");
        console.log("site is missing DiaQuote");
      }
      // Prepare the data to be passed to the DIA Quotes page
      const siteData = {
        CustomerName: site.CustomerName,
        Sitename: site.Sitename,
        SiteID: site.SiteID,
        BuildingName: site.BuildingName,
        Street: site.Street,
        City: site.City,
        Country: site.Country,
        Zipcode: site.Zipcode,
        Galk: site.Galk, // Include the Galk value
      };
      // Save to localStorage before navigating
      localStorage.setItem("diasiteData", JSON.stringify(siteData));
      // Redirect to the DIA Quotes page with the Galk parameter
      navigate(`/dashboard/quotes/dia?galk=${site.Galk}`, {
        state: { siteData },
      });
    } catch (error) {
      console.error("Error navigating to DIA Quotes page:", error);
      alert("Failed to navigate to DIA Quotes page.");
    }
  };

  // Handle fttp Quote for selected site only via galk id,also galk value taking from here and sending on the fttp.
  const handleFttpQuote = async (site) => {
    try {
      if (!site) {
        // alert("Site data is unavailable.");
        console.log("site is missing handleFttpQuote");
      }

      const siteData = {
        CustomerName: site.CustomerName,
        Sitename: site.Sitename,
        SiteID: site.SiteID,
        Street: site.Street,
        Zipcode: site.Zipcode,
        Country: site.Country,
        Galk: site.Galk,
      };

      // Save to localStorage before navigating
      localStorage.setItem("fttpsiteData", JSON.stringify(siteData));
      // Redirect to the FTTP Quotes page with the Galk parameter
      navigate(`/dashboard/quotes/fttp?galk=${site.Galk}`, {
        state: { siteData },
      });
    } catch (error) {
      console.error("Error fetching FTTP Quote:", error);
      alert("Failed to fetch FTTP Quote.");
    }
  };
  // Handle p2p Quote for selected site only via galk id
  const handleP2pQuote = async (site) => {
    try {
      if (site) {
        console.log("site is missingP2p ");
      }

      const siteData = {
        CustomerName: site.CustomerName,
        Sitename: site.Sitename,
        SiteID: site.SiteID,
        BuildingName: site.BuildingName,
        Street: site.Street,
        City: site.City,
        Country: site.Country,
        Zipcode: site.Zipcode,
        Galk: site.Galk, // Include the Galk value
      };

      localStorage.setItem("p2psiteData", JSON.stringify(siteData));

      navigate(`/dashboard/quotes/p2p?galk=${site.Galk}`, {
        state: { siteData },
      });
    } catch (error) {
      console.error("Error fetching P2P Quote:", error);
      alert("Failed to fetch P2P Quote.");
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

      {/* Delete Button */}
      <button
        onClick={() => {
          setItemToDelete(site._id); // Set the ID of the item to delete
          setDeleteModalOpen(true); // Open the delete confirmation modal
        }}
       className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >🗑️ Delete
      </button>

      
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Warning</h3>
        <p>Are you sure you want to delete this office data?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handleDelete(itemToDelete)} // Delete the item
            className="px-4 py-2 bg-red-500 text-white rounded shadow mr-2"
          >
            OK
          </button>
          <button
            onClick={() => setDeleteModalOpen(false)} // Close the modal
            className="px-4 py-2 bg-gray-500 text-white rounded shadow"
          >
            Cancel
          </button>
        </div>
      </Modal>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => handleDiaQuote(site)}
                  >
                    DIA Quotes
                  </button>

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => handleFttpQuote(site)}
                  >
                    FTTP Quotes
                  </button>

                  <button
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
                    onClick={() => handleP2pQuote(site)}
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
                    <Modal isOpen={!!editingId} onClose={() => setEditingId(null)}>
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
          </Modal>
        </div>
      )}
    </div>
  );
};

export default SiteDataPage;
