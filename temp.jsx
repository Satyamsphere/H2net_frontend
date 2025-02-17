import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";

const SiteDataPage = () => {
  const [siteData, setSiteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 13;

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
    fetchData();
  }, [fetchData]);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
          </tr>
        </thead>
        <tbody>
          {currentRows.map((site, index) => (
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
              <td className="border p-2">{site.SiteStatus ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow disabled:opacity-50"
        >
          ◀️ Previous
        </button>
        <span className="text-lg">Page {currentPage} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow disabled:opacity-50"
        >
          Next ▶️
        </button>
      </div>
    </div>
  );
};






import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PAGE_SIZE = 10; // Define items per page

const MyComponent = () => {
  const [siteData, setSiteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ SiteStatus: "", CustomerName: "" });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/officedata/sitedata"
      );
      setSiteData(response.data.data);
      applyPagination(response.data.data, 1); // Initialize with first page
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

  const applyPagination = (data, page) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);
    setFilteredData(paginatedData);
    setTotalPages(Math.ceil(data.length / PAGE_SIZE));
  };

  const applyFilters = () => {
    let filtered = siteData.filter((site) => {
      return (
        (!filters.SiteStatus || site.SiteStatus.toString() === filters.SiteStatus) &&
        (!filters.CustomerName || site.CustomerName.includes(filters.CustomerName))
      );
    });

    setCurrentPage(1);
    applyPagination(filtered, 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      applyPagination(siteData, currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      applyPagination(siteData, currentPage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/office-form")} className="px-4 py-2 bg-blue-500 text-white rounded shadow">
          ➕ Add Site
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-500 text-white rounded shadow">
          {showFilters ? "❌ Hide Filters" : "🔍 Show Filters"}
        </button>
        <button onClick={downloadCSV} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Download
        </button>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-yellow-500 text-white rounded shadow">
          🔄 Refresh
        </button>
      </div>

      {/* Filters */}
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
            <input
              type="text"
              placeholder="Customer Name"
              value={filters.CustomerName}
              onChange={(e) => setFilters({ ...filters, CustomerName: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
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
            {["Customer Name", "Site Name", "Site ID", "Room Name", "Building", "Street", "City", "Zipcode", "Country", "Galk", "Status", "Operation"].map(
              (heading) => (
                <th key={heading} className="border p-2">{heading}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((site, index) => (
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
                  <span className={site.SiteStatus ? "" : ""}>{site.SiteStatus ? "✅" : "❌"}</span>
                </td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(site)} className="bg-blue-500 text-white px-2 py-1 rounded">✏️ Edit</button>
                  <button onClick={() => handleDelete(site._id)} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center p-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-500 text-white rounded shadow disabled:opacity-50">
          ◀️ Previous
        </button>
        <span className="text-lg">Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-500 text-white rounded shadow disabled:opacity-50">
          Next ▶️
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
