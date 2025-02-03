import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import OrdersList from './orders/OrdersList';
import PlaceOrder from './orders/PlaceOrder';
import View2 from './orders/View2';

const Orders = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-50 rounded-lg">
        <div className="flex space-x-1 p-2 border-b">
          <NavLink
            to="/dashboard/orders/list"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 ${
                isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60'
              }`
            }
          >
            <span className="material-icons text-xl"></span>
            <span>Orders List</span>
          </NavLink>
          <NavLink
            to="/dashboard/orders/place"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 ${
                isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60'
              }`
            }
          >
            <span className="material-icons text-xl"></span>
            <span>Place Order</span>
          </NavLink>
          <NavLink
            to="/dashboard/orders/view2"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 ${
                isActive ? 'bg-white shadow text-blue-600' : 'hover:bg-white/60'
              }`
            }
          >
            <span className="material-icons text-xl"></span>
            <span>View 2</span>
          </NavLink>
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          <Routes>
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<OrdersList />} />
            <Route path="place" element={<PlaceOrder />} />
            <Route path="view2" element={<View2 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Orders;