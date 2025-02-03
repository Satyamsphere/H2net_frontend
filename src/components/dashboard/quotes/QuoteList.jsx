import React from 'react';

const QuoteList = () => {
  const quotes = [
    {
      productName: 'Direct Internet Access',
      id: '313',
      createdTime: 'Jan 22, 2023 10:14',
      feasibilityExpiryDate: 'Feb 5, 2025',
      numberOfResults: '5',
      aEndCustomerName: 'H2NET LIMITED',
      bEndCustomerName: '',
      aEndSiteName: 'Head Office',
      bEndSiteName: '',
      aEndPostCode: 'TW7 4AS',
      bEndPostCode: '',
      aEndCountry: 'GB',
      bEndCountry: '',
      submitterFullName: 'Hesham Moussa',
      submitterEmailAddress: 'hesham.moussa@h2n.at'
    },
    // Add more quotes as needed
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Quote List</h2>
        <div className="flex space-x-2">
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
              <th className="px-4 py-2 text-left">Product name</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Created Time (UTC)</th>
              <th className="px-4 py-2 text-left">Feasibility Expiry Date</th>
              <th className="px-4 py-2 text-left">Number of Results</th>
              <th className="px-4 py-2 text-left">A-End Customer Name</th>
              <th className="px-4 py-2 text-left">B-End Customer Name</th>
              <th className="px-4 py-2 text-left">A-End Site name</th>
              <th className="px-4 py-2 text-left">B-End Site Name</th>
              <th className="px-4 py-2 text-left">A-End Post code</th>
              <th className="px-4 py-2 text-left">B-End Post Code</th>
              <th className="px-4 py-2 text-left">A-End Country</th>
              <th className="px-4 py-2 text-left">B-End Country</th>
              <th className="px-4 py-2 text-left">Submitter Full Name</th>
              <th className="px-4 py-2 text-left">Submitter Email Address</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-purple-600">{quote.productName}</td>
                <td className="px-4 py-2">{quote.id}</td>
                <td className="px-4 py-2">{quote.createdTime}</td>
                <td className="px-4 py-2">{quote.feasibilityExpiryDate}</td>
                <td className="px-4 py-2">{quote.numberOfResults}</td>
                <td className="px-4 py-2 text-blue-600">{quote.aEndCustomerName}</td>
                <td className="px-4 py-2 text-orange-600">{quote.bEndCustomerName}</td>
                <td className="px-4 py-2">{quote.aEndSiteName}</td>
                <td className="px-4 py-2">{quote.bEndSiteName}</td>
                <td className="px-4 py-2">{quote.aEndPostCode}</td>
                <td className="px-4 py-2">{quote.bEndPostCode}</td>
                <td className="px-4 py-2 text-purple-600">{quote.aEndCountry}</td>
                <td className="px-4 py-2 text-purple-600">{quote.bEndCountry}</td>
                <td className="px-4 py-2">{quote.submitterFullName}</td>
                <td className="px-4 py-2">{quote.submitterEmailAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteList;