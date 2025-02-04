import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import QuoteList from './quotes/QuoteList';
import DIAQuote from './quotes/DIAQuote';
import FTTPQuote from './quotes/FTTPQuote';
import PointToPointQuote from './quotes/PointToPointQuote';

const Quotes = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-50 rounded-lg">
        <div className="flex space-x-1 p-2">
          <NavLink
            to="/dashboard/quotes/list"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ease-in-out ${
                isActive ? 'bg-white shadow' : 'hover:bg-white/60'
              }`
            }
          >
            <span>Quote List</span>
          </NavLink>
          <NavLink
            to="/dashboard/quotes/dia"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ease-in-out ${
                isActive ? 'bg-white shadow' : 'hover:bg-white/60'
              }`
            }
          >
            <span>DIA Quote</span>
          </NavLink>
          <NavLink
            to="/dashboard/quotes/fttp"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ease-in-out ${
                isActive ? 'bg-white shadow' : 'hover:bg-white/60'
              }`
            }
          >
            <span>FTTP Quote</span>
          </NavLink>
          <NavLink
            to="/dashboard/quotes/p2p"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ease-in-out ${
                isActive ? 'bg-white shadow' : 'hover:bg-white/60'
              }`
            }
          >
            <span>Point to Point Quote</span>
          </NavLink>
        </div>
        <div className="p-4">
          <Routes>
            <Route path="list" element={<QuoteList />} />
            <Route path="dia" element={<DIAQuote />} />
            <Route path="fttp" element={<FTTPQuote />} />
            <Route path="p2p" element={<PointToPointQuote />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};



export default Quotes;