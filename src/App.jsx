import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Subscriptions from './components/Subscriptions';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import UserRegister from './components/auth/UserAccountRegister';
import AdminRegister from './components/auth/addNewAdminRegister';
import ProductManagerRegister from './components/auth/ProductManagerRegister';
import ProvisioningCoOrdinatorRegister from './components/auth/ProvisioningCoOrdinatorRegister';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import OfficeFormManual from './components/Officedata/OfficeFormManual';
import BulkuploadData from './components/Officedata/BulkuploadData'
import CreateOrganization from './components/Organization/CreateOrganization';
import PartnershiprequestOrgId from './components/Admin/PartnershiprequestOrgId';
import Association_appdis from './components/Admin/Association_appdis';
import UKOfficeFormManual from './components/Officedata/UKOfficeFormManual';
import { ToastContainer } from "react-toastify";
import BulkSitesdataRetrival from './components/Admin/BulkSitesdataRetrival';
import AllRoles from './components/auth/AllRoles/AllRoles';
import './App.css';
import { useState } from 'react';

function App() {
  // For demo purposes, let's assume the user is logged in
  //const isLoggedIn = true;
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //when user refresh button, due token is not going to logout
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard/sites" replace />
              ) : (
                <>
                  <Hero />
                  <Partners />
                  <Subscriptions />
                </>
              )
            }
          />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn */}
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/Adminregister" element={<AdminRegister />} />
          <Route path="/ProductManagerregister" element={<ProductManagerRegister />} />
          <Route path="/ProvisioningCoOrdinatorregister" element={<ProvisioningCoOrdinatorRegister />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard/*"
            element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/login" replace />}
          />
          <Route path="/office-form" element={<OfficeFormManual />} />
          <Route path="/office-form-uk" element={<UKOfficeFormManual />} />
          <Route path="/blulk-upload" element={<BulkuploadData />} />
          <Route path="/create-org" element={<CreateOrganization />} />
          <Route path="/partnershipreq" element={<PartnershiprequestOrgId />} />
          <Route path="/Associationdis" element={<Association_appdis />} />
          <Route path="/bulkstesdata" element={<BulkSitesdataRetrival />} />
          <Route path="/AllRoles" element={<AllRoles />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;