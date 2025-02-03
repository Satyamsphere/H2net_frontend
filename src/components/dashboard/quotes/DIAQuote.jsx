import React, { useState } from 'react';

const DIAQuote = () => {
  const [formData, setFormData] = useState({
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
    galk: '',
    portSpeed: '1Gbps',
    contractTerm: '36 Months',
    bandwidth: '100 Mbps',
    ipv4SubnetSize: '/30',
    accessProviders: {
      btOpenreach: false,
      btWholesale: false,
      cityFibre: false,
      colt: false,
      sky: false,
      talkTalk: false,
      virginMedia: false
    }
  });

  const [errors, setErrors] = useState({});

  const getBandwidthOptions = (portSpeed) => {
    const baseValue = portSpeed === '100 Mbps' ? 10 : 
                     portSpeed === '1 Gbps' ? 100 :
                     portSpeed === '10 Gbps' ? 1000 :
                     portSpeed === '100 Gbps' ? 10000 : 10;
    
    return Array.from({ length: 10 }, (_, i) => {
      const value = baseValue * (i + 1);
      return portSpeed === '100 Mbps' ? `${value} Mbps` : `${value} Mbps`;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer Name is required';
    }
    if (!formData.postCode.trim()) {
      newErrors.postCode = 'Post Code is required';
    }

    // Validate at least one access provider is selected
    const hasSelectedProvider = Object.values(formData.accessProviders).some(value => value);
    if (!hasSelectedProvider) {
      newErrors.accessProviders = 'Please select at least 1 item.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  const portSpeedOptions = ['100 Mbps', '1 Gbps', '10 Gbps', '100 Gbps'];
  const contractTermOptions = ['12 Months', '24 Months', '36 Months', '48 Months', '60 Months'];
  const bandwidthOptions = getBandwidthOptions(formData.portSpeed);
  const ipv4SubnetSizes = ['/30', '/29', '/28', '/27', '/26'];

  const handlePortSpeedChange = (speed) => {
    const newBandwidth = getBandwidthOptions(speed)[0];
    setFormData({
      ...formData,
      portSpeed: speed,
      bandwidth: newBandwidth
    });
  };

  const isRipePolicyRequired = ['/28', '/27', '/26'].includes(formData.ipv4SubnetSize);

  return (
    <div className="bg-white p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* A-End Section */}
        <div className="mb-6 border rounded-lg p-4">
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
              <input
                type="text"
                className={`w-full px-3 py-2 border ${errors.customerName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 truncate`}
                placeholder="Enter value"
                value={formData.customerName}
                onChange={(e) => {
                  setFormData({...formData, customerName: e.target.value});
                  if (errors.customerName) {
                    setErrors({...errors, customerName: ''});
                  }
                }}
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.siteName}
                onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.siteId}
                onChange={(e) => setFormData({...formData, siteId: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.roomName}
                onChange={(e) => setFormData({...formData, roomName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.buildingName}
                onChange={(e) => setFormData({...formData, buildingName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building/Street Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.buildingStreetNumber}
                onChange={(e) => setFormData({...formData, buildingStreetNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.streetName}
                onChange={(e) => setFormData({...formData, streetName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town/City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.townCity}
                onChange={(e) => setFormData({...formData, townCity: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${errors.postCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 truncate`}
                placeholder="Enter value"
                value={formData.postCode}
                onChange={(e) => {
                  setFormData({...formData, postCode: e.target.value});
                  if (errors.postCode) {
                    setErrors({...errors, postCode: ''});
                  }
                }}
              />
              {errors.postCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
              )}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GALK
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value"
                value={formData.galk}
                onChange={(e) => setFormData({...formData, galk: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Port Speed and Contract Term Section */}
            <div className="flex space-x-6">
              {/* Port Speed Section */}
              <div className="flex-1 border rounded-lg p-4">
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
                      onClick={() => handlePortSpeedChange(speed)}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contract Term Section */}
              <div className="flex-1 border rounded-lg p-4">
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
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bandwidth
              </label>
              <div className="grid grid-cols-5 gap-1">
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

            {/* IPv4 Subnet Size Section */}
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IPv4 Subnet Size
              </label>
              <div className="space-y-2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block mb-2">
                  WAN IP Only
                </div>
                <div className="flex space-x-1">
                  {ipv4SubnetSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 text-sm rounded-md border ${
                        formData.ipv4SubnetSize === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData({...formData, ipv4SubnetSize: size})}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Access Providers Section */}
            <div className="border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Providers
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  btOpenreach: 'BT Openreach',
                  btWholesale: 'BT Wholesale',
                  cityFibre: 'CityFibre',
                  colt: 'Colt',
                  sky: 'Sky',
                  talkTalk: 'TalkTalk',
                  virginMedia: 'Virgin Media'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={formData.accessProviders[key]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            accessProviders: {
                              ...formData.accessProviders,
                              [key]: e.target.checked
                            }
                          });
                          if (errors.accessProviders) {
                            setErrors({...errors, accessProviders: ''});
                          }
                        }}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <div className={`toggle-label block overflow-hidden h-6 rounded-full ${formData.accessProviders[key] ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    </div>
                    <span className="text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
              {errors.accessProviders && (
                <p className="text-red-500 text-sm mt-2">{errors.accessProviders}</p>
              )}
            </div>

            {/* Circuit Diversity Section */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Circuit Diversity (Coming Soon)</h4>
              <p className="text-sm text-gray-600">
                This comes with two sets of network terminating equipment, each with a single diversity routed path which you can hope in
                different buildings. If something goes wrong on the primary path, you can manually switch traffic to the secondary one.
              </p>
            </div>

            {/* RIPE Policy Section */}
            <div className={`border rounded-lg p-4 ${!isRipePolicyRequired ? 'opacity-50' : ''}`}>
              <h4 className="font-medium mb-2">RIPE Policy</h4>
              <p className="text-sm text-gray-600">
                I agree that because I am requesting 16 or more IPv4 addresses, I will comply with any RIPE policies including providing a
                justification for the use of the chosen subnet size.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default DIAQuote;