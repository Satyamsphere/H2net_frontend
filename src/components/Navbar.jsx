import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StatCard = ({ icon, title, value, subtitle, trend }) => {
  const getTrendBackground = (trend) => {
    if (trend?.includes('-')) {
      return 'bg-red-50';
    } else if (trend?.includes('+')) {
      return 'bg-green-50';
    }
    return '';
  };

  return (
    <div className="flex items-start space-x-2">
      <div className="text-h2net-blue text-xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-600 text-left">{title}</div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold">{value}</span>
          {trend && (
            <span className={`text-sm px-2 py-0.5 rounded ${getTrendBackground(trend)} ${trend.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 text-left">{subtitle}</div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/reset-password'].includes(location.pathname);
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-full mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-h2net-blue font-bold text-2xl">
              H2NET
            </Link>
            
            <div className="flex space-x-6 no-scrollbar">
              <StatCard
                icon="📊"
                title="Total number of quotes"
                value="266"
                subtitle="Count of all quotes"
              />
              <StatCard
                icon="📈"
                title="Total number of quotes"
                value="0"
                trend="-10,000%"
                subtitle="Since last month"
              />
              <StatCard
                icon="📊"
                title="Total number of quotes"
                value="10"
                trend="+1,000%"
                subtitle="Rolling month"
              />
              <StatCard
                icon="🏢"
                title="Total number of sites"
                value="15"
                subtitle="Count of all sites"
              />
              <StatCard
                icon="👥"
                title="Total number of customers"
                value="5"
                subtitle="Count of all customers"
              />
            </div>

            <div>
              <span className="text-gray-600">HYPERCONNECTED ID: 28070001</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-h2net-blue font-bold text-2xl">
            H2NET
          </Link>
          
          {!isAuthPage && (
            <div className="flex space-x-6 overflow-x-auto max-w-4xl">
              <StatCard
                icon="📊"
                title="Total number of quotes"
                value="266"
                subtitle="Count of all quotes"
              />
              <StatCard
                icon="📈"
                title="Total number of quotes"
                value="0"
                trend="-10,000%"
                subtitle="Since last month"
              />
              <StatCard
                icon="📊"
                title="Total number of quotes"
                value="10"
                trend="+1,000%"
                subtitle="Rolling month"
              />
              <StatCard
                icon="🏢"
                title="Total number of sites"
                value="15"
                subtitle="Count of all sites"
              />
              <StatCard
                icon="👥"
                title="Total number of customers"
                value="5"
                subtitle="Count of all customers"
              />
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-h2net-blue hover:text-white hover:bg-h2net-blue rounded-lg transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-h2net-blue text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;