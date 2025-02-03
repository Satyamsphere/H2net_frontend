import React, { useState } from 'react';

const FTTPQuote = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    siteName: '',
    siteId: '',
    roomName: '',
    postCode: '',
    country: 'United Kingdom of Great Britain and Northern Ireland'
  });

  const [addressResults, setAddressResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle address lookup here
    console.log('Looking up address:', formData);
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      siteName: '',
      siteId: '',
      roomName: '',
      postCode: '',
      country: 'United Kingdom of Great Britain and Northern Ireland'
    });
    setAddressResults([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">CHOOSE THE ADDRESS</h2>
        <button
          onClick={handleReset}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <span className="material-icons text-sm mr-1">refresh</span>
          Reset
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* A-End Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-blue-600 text-sm">A</span>
            </div>
            <h3 className="text-lg font-semibold">A-End</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter value"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-lg">edit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter value"
                  value={formData.siteName}
                  onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-lg">edit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter value"
                  value={formData.siteId}
                  onChange={(e) => setFormData({...formData, siteId: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-lg">edit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter value"
                  value={formData.roomName}
                  onChange={(e) => setFormData({...formData, roomName: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-lg">edit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter value"
                  value={formData.postCode}
                  onChange={(e) => setFormData({...formData, postCode: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons text-lg">edit</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              >
                <option value="United Kingdom of Great Britain and Northern Ireland">
                  United Kingdom of Great Britain and Northern Ireland
                </option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Find Address
            </button>
          </div>
        </div>

        {/* Address Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">GALK</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Street Number</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Street/Road Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sub-Premises</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Premises Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Locality</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Post Town</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Country</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Postcode</th>
              </tr>
            </thead>
            <tbody>
              {addressResults.map((address, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{address?.galk}</td>
                  <td className="px-4 py-2">{address?.streetNumber}</td>
                  <td className="px-4 py-2">{address?.streetName}</td>
                  <td className="px-4 py-2">{address?.subPremises}</td>
                  <td className="px-4 py-2">{address?.premisesName}</td>
                  <td className="px-4 py-2">{address?.locality}</td>
                  <td className="px-4 py-2">{address?.postTown}</td>
                  <td className="px-4 py-2">{address?.country}</td>
                  <td className="px-4 py-2">{address?.postcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default FTTPQuote;