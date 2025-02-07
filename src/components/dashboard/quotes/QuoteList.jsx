import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    CustomerName: "",
    Sitename: "",
    SiteID: "",
    RoomName: "",
    BuildingName: "",
    StreetName:"",
    StreetNumber: "",
    City: "",
    Zipcode: "",
    Country: "",
    Galk: "",
    PortAccessSpeed: "",
    ContractTerm: "",
    Bandwidth: "",
    AccessProviders: "",
    Ipv4Subnet: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quotes/diaquotes/data");
        setQuotes(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes data:", error);
        setError("Failed to fetch quotes data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  //to filter the data from filter button
  const applyFilters = () => {
    const filtered = quotes.filter((quote) =>
      Object.keys(filters).every(
        (key) =>
          filters[key] === "" || (quote[key] && quote[key].toString().toLowerCase().includes(filters[key].toLowerCase()))
      )
    );
    setFilteredData(filtered);
  };


  //to download csv file from download button
  const downloadCSV = () => {
    const csvHeader = "CustomerName,Sitename,SiteID,RoomName,BuildingName,City,Zipcode,Country,Galk,PortAccessSpeed,ContractTerm,Bandwidth,AccessProviders,Ipv4Subnet\n";
    const csvRows = filteredData
      .map(
        (quote) =>
          `${quote.CustomerName},${quote.Sitename},${quote.SiteID},${quote.RoomName},${quote.BuildingName},${quote.City},${quote.Zipcode},${quote.Country},${quote.Galk},${quote.PortAccessSpeed},${quote.ContractTerm},${quote.Bandwidth},${quote.AccessProviders},${quote.Ipv4Subnet}`
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





  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quote List</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">
              Filter
            </button>
            <button 
              onClick={downloadCSV} 
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">
              Download
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm">
              Refresh
            </button>
          </div>
        </div>
  
        {showFilters && (
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(filters).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="p-2 border border-gray-300 rounded w-full text-sm"
                />
              ))}
            </div>
            <button 
              onClick={applyFilters} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Apply Filters
            </button>
          </div>
        )}
  
        {/* Table Container - Prevents Overflow Issues */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed border border-gray-300 bg-white text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {[
                  "Customer Name", "Site Name", "Site ID", "Room Name", "Building",
                  "Street Name", "Street Number", "City", "Zipcode", "Country", 
                  "Galk", "Port Access Speed", "Contract Term", "Bandwidth", 
                  "Access Providers", "IPv4 Subnet"
                ].map((header) => (
                  <th key={header} className="px-4 py-2 text-center border border-gray-300 font-medium w-[120px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((quote, index) => (
                <tr key={quote._id || index} className="border-t hover:bg-gray-50 h-12">
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.CustomerName}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Sitename}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.SiteID}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.RoomName}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.BuildingName}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.StreetName}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.StreetNumber}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.City}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Zipcode}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Country}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Galk}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.PortAccessSpeed}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.ContractTerm}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Bandwidth}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.AccessProviders}</td>
                  <td className="px-3 py-2 border border-gray-300 text-center truncate">{quote.Ipv4Subnet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default QuoteList;
