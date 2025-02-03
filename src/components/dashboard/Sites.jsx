import React from 'react';

const Sites = () => {
  const sites = [
    {
      customerName: 'H2NET',
      active: true,
      siteName: 'Isleworth Office',
      siteId: 'MDX01',
      roomName: 'DC',
      buildingName: 'Westgate House',
      buildingNumber: '661',
      street: 'London Road',
      townCity: 'Isleworth',
      postCode: 'TW7 4AS',
      addressKey: '',
      country: 'GB'
    },
    {
      customerName: 'H2NET',
      active: false,
      siteName: 'FTTP Site',
      siteId: 'FTTP',
      street: 'Chestnut Drive',
      townCity: 'London',
      postCode: 'E11 2TA',
      addressKey: 'A00022478605',
      country: 'GB'
    },
    // Add more sites as per the screenshot
  ];

  return (
    <div className="p-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Site List</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Site
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Filter
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Download
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Customer Name</th>
                <th className="px-4 py-2 text-left">Site Active</th>
                <th className="px-4 py-2 text-left">Site Name</th>
                <th className="px-4 py-2 text-left">Site ID</th>
                <th className="px-4 py-2 text-left">Room Name</th>
                <th className="px-4 py-2 text-left">Building Name</th>
                <th className="px-4 py-2 text-left">Building/Street Number</th>
                <th className="px-4 py-2 text-left">Street</th>
                <th className="px-4 py-2 text-left">Town/City</th>
                <th className="px-4 py-2 text-left">Post Code</th>
                <th className="px-4 py-2 text-left">Address Location Key</th>
                <th className="px-4 py-2 text-left">Country</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-blue-600">{site.customerName}</td>
                  <td className="px-4 py-2">
                    {site.active ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{site.siteName}</td>
                  <td className="px-4 py-2">{site.siteId}</td>
                  <td className="px-4 py-2">{site.roomName}</td>
                  <td className="px-4 py-2">{site.buildingName}</td>
                  <td className="px-4 py-2">{site.buildingNumber}</td>
                  <td className="px-4 py-2">{site.street}</td>
                  <td className="px-4 py-2">{site.townCity}</td>
                  <td className="px-4 py-2">{site.postCode}</td>
                  <td className="px-4 py-2">{site.addressKey}</td>
                  <td className="px-4 py-2">{site.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sites;