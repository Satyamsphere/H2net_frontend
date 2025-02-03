import React from 'react';
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import Sites from './dashboard/Sites';
import Quotes from './dashboard/Quotes';
import Orders from './dashboard/Orders';

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 text-white">
        <div className="max-w-full mx-auto px-4">
          <div className="flex space-x-8 py-2">
            <NavLink
              to="/dashboard/sites"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`
              }
            >
              Sites
            </NavLink>
            <NavLink
              to="/dashboard/quotes/list"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors ${
                  isActive || location.pathname.includes('/dashboard/quotes') ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`
              }
            >
              Quotes
            </NavLink>
            <NavLink
              to="/dashboard/orders/list"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition-colors ${
                  isActive || location.pathname.includes('/dashboard/orders') ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`
              }
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto">
        <Routes>
          <Route path="sites" element={<Sites />} />
          <Route path="quotes/*" element={<Quotes />} />
          <Route path="orders/*" element={<Orders />} />
          <Route path="" element={<Navigate to="sites" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;