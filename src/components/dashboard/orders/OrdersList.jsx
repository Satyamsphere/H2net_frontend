import React from 'react';

const OrdersList = () => {
  const orders = [
    {
      orderId: 'ORD-001',
      customerName: 'H2NET',
      orderDate: '2024-02-20',
      status: 'Processing',
      total: '£1,299.99'
    },
    // Add more orders as needed
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Orders List</h2>
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
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Order Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2 text-blue-600">{order.customerName}</td>
                <td className="px-4 py-2">{order.orderDate}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.total}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;