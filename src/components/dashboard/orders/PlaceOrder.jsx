import React, { useState } from 'react';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    aEnd: {
      customerName: '',
      siteName: '',
      siteId: '',
      roomName: '',
      buildingName: '',
      buildingStreetNumber: '',
      streetName: '',
      townCity: '',
      postCode: '',
      country: 'United Kingdom of Great Britain and Northern Ireland',
      galk: ''
    },
    bEnd: {
      customerName: '',
      siteName: '',
      siteId: '',
      roomName: '',
      buildingName: '',
      buildingStreetNumber: '',
      streetName: '',
      townCity: '',
      postCode: '',
      country: 'United Kingdom of Great Britain and Northern Ireland'
    },
    portSpeed: '1 Gbps',
    contractTerm: '36 Months',
    bandwidth: '1000 Mbps'
  });

  const handleReset = () => {
    setFormData({
      aEnd: {
        customerName: '',
        siteName: '',
        siteId: '',
        roomName: '',
        buildingName: '',
        buildingStreetNumber: '',
        streetName: '',
        townCity: '',
        postCode: '',
        country: 'United Kingdom of Great Britain and Northern Ireland',
        galk: ''
      },
      bEnd: {
        customerName: '',
        siteName: '',
        siteId: '',
        roomName: '',
        buildingName: '',
        buildingStreetNumber: '',
        streetName: '',
        townCity: '',
        postCode: '',
        country: 'United Kingdom of Great Britain and Northern Ireland'
      },
      portSpeed: '1 Gbps',
      contractTerm: '36 Months',
      bandwidth: '1000 Mbps'
    });
  };

  const handleEndPointChange = (end, field, value) => {
    setFormData(prev => ({
      ...prev,
      [end]: {
        ...prev[end],
        [field]: value
      }
    }));
  };

  const EndPointForm = ({ end, title }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 text-sm">{end === 'aEnd' ? 'A' : 'B'}</span>
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {end === 'aEnd' && (
          <button
            type="button"
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <span className="material-icons text-sm mr-1">refresh</span>
            Reset
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name {end === 'aEnd' && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter value"
              value={formData[end].customerName}
              onChange={(e) => handleEndPointChange(end, 'customerName', e.target.value)}
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
              value={formData[end].siteName}
              onChange={(e) => handleEndPointChange(end, 'siteName', e.target.value)}
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
              value={formData[end].siteId}
              onChange={(e) => handleEndPointChange(end, 'siteId', e.target.value)}
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
              value={formData[end].roomName}
              onChange={(e) => handleEndPointChange(end, 'roomName', e.target.value)}
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
            Building Name
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter value"
              value={formData[end].buildingName}
              onChange={(e) => handleEndPointChange(end, 'buildingName', e.target.value)}
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
            Building/Street Number
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter value"
              value={formData[end].buildingStreetNumber}
              onChange={(e) => handleEndPointChange(end, 'buildingStreetNumber', e.target.value)}
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
            Street Name
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter value"
              value={formData[end].streetName}
              onChange={(e) => handleEndPointChange(end, 'streetName', e.target.value)}
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
            Town/City
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter value"
              value={formData[end].townCity}
              onChange={(e) => handleEndPointChange(end, 'townCity', e.target.value)}
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
              value={formData[end].postCode}
              onChange={(e) => handleEndPointChange(end, 'postCode', e.target.value)}
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
            value={formData[end].country}
            onChange={(e) => handleEndPointChange(end, 'country', e.target.value)}
          >
            <option value="United Kingdom of Great Britain and Northern Ireland">
              United Kingdom of Great Britain and Northern Ireland
            </option>
          </select>
        </div>
        {end === 'aEnd' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GALK
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.aEnd.galk}
                onChange={(e) => handleEndPointChange('aEnd', 'galk', e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-icons text-lg">edit</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const portSpeedOptions = ['100 Mbps', '1 Gbps', '10 Gbps', '100 Gbps'];
  const contractTermOptions = ['12 Months', '24 Months', '36 Months', '48 Months', '60 Months'];
  const bandwidthOptions = ['100 Mbps', '200 Mbps', '300 Mbps', '400 Mbps', '500 Mbps', 
                           '600 Mbps', '700 Mbps', '800 Mbps', '900 Mbps', '1000 Mbps'];

  return (
    <div className="bg-white p-6 rounded-lg">
      <form>
        <EndPointForm end="aEnd" title="A-End" />
        <EndPointForm end="bEnd" title="B-End" />

        <div className="space-y-6">
          {/* Port Speed and Contract Term Section */}
          <div className="flex space-x-6">
            {/* Port Speed Section */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port or Access Speed
              </label>
              <div className="flex space-x-1">
                {portSpeedOptions.map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md border ${
                      formData.portSpeed === speed
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData({...formData, portSpeed: speed})}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Contract Term Section */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Term
              </label>
              <div className="flex space-x-1">
                {contractTermOptions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md border ${
                      formData.contractTerm === term
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData({...formData, contractTerm: term})}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bandwidth Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bandwidth
            </label>
            <div className="grid grid-cols-10 gap-1">
              {bandwidthOptions.map((bandwidth) => (
                <button
                  key={bandwidth}
                  type="button"
                  className={`px-4 py-2 text-sm rounded-md border ${
                    formData.bandwidth === bandwidth
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData({...formData, bandwidth: bandwidth})}
                >
                  {bandwidth}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;