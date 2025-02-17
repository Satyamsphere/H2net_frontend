import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PAGE_SIZE = 12;

const BulkSitesdataRetrival = () => {
  const [data, setData] = useState([]); // All data fetched from the API
  const [filteredData, setFilteredData] = useState([]); // Data after applying filters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state
  const [filters, setFilters] = useState({
    CustomerName: "",
    Galk: "",
    SiteStatus: "",
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/officedata/bulksitesdata");
        setData(response.data.data); // Set all data
        applyFilters(response.data.data); // Apply filters and pagination
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and pagination
  const applyFilters = (data) => {
    let filtered = data.filter((site) => {
      return (
        (filters.CustomerName === "" ||
          site.CustomerName?.toLowerCase().includes(filters.CustomerName.toLowerCase())) &&
        (filters.Galk === "" ||
          site.Galk?.toLowerCase().includes(filters.Galk.toLowerCase())) &&
        (filters.SiteStatus === "" ||
          site.SiteStatus.toString() === filters.SiteStatus)
      );
    });

    setFilteredData(filtered); // Set filtered data
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE)); // Calculate total pages
    applyPagination(filtered, currentPage); // Apply pagination
  };

  // Apply pagination to filtered data
  const applyPagination = (data, page) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);
    setFilteredData(paginatedData); // Set paginated data
  };

  // Handle page change
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      applyPagination(data, currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      applyPagination(data, currentPage - 1);
    }
  };

  // Update filters and reapply filtering
  useEffect(() => {
    applyFilters(data);
  }, [filters, data]);

  if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

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
            {["CustomerName", "Galk"].map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={filters[key]}
                onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
            ))}
          </div>
        </div>
      )}

      <motion.h2
        className="text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       Admin-Bulk Uploaded Site Data
      </motion.h2>

      <div className="overflow-x-auto">
        <motion.table
          className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <thead>
            <tr className="bg-blue-600 text-white text-left border border-gray-300">
              <th className="px-4 py-3 border border-gray-400">Customer Name</th>
              <th className="px-4 py-3 border border-gray-400">Site Name</th>
              <th className="px-4 py-3 border border-gray-400">Site ID</th>
              <th className="px-4 py-3 border border-gray-400">Room Name</th>
              <th className="px-4 py-3 border border-gray-400">Building Name</th>
              <th className="px-4 py-3 border border-gray-400">Street</th>
              <th className="px-4 py-3 border border-gray-400">City</th>
              <th className="px-4 py-3 border border-gray-400">Zipcode</th>
              <th className="px-4 py-3 border border-gray-400">Country</th>
              <th className="px-4 py-3 border border-gray-400">Galk</th>
              <th className="px-4 py-3 border border-gray-400">Site Status</th>
              <th className="px-4 py-3 border border-gray-400">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <motion.tr
                key={item._id}
                className={`border border-gray-300 transition duration-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-2 border border-gray-400">{item.CustomerName}</td>
                <td className="px-4 py-2 border border-gray-400">{item.Sitename}</td>
                <td className="px-4 py-2 border border-gray-400">{item.SiteID}</td>
                <td className="px-4 py-2 border border-gray-400">{item.RoomName}</td>
                <td className="px-4 py-2 border border-gray-400">{item.BuildingName}</td>
                <td className="px-4 py-2 border border-gray-400">{item.Street}</td>
                <td className="px-4 py-2 border border-gray-400">{item.City}</td>
                <td className="px-4 py-2 border border-gray-400">{item.Zipcode}</td>
                <td className="px-4 py-2 border border-gray-400">{item.Country}</td>
                <td className="px-4 py-2 border border-gray-400">{item.Galk}</td>
                <td className="px-4 py-2 border border-gray-400">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.SiteStatus ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.SiteStatus ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray-400">{item.Notes}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BulkSitesdataRetrival;