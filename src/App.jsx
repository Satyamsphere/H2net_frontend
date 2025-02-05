import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Subscriptions from './components/Subscriptions';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import OfficeFormManual from './components/Officedata/OfficeFormManual';
import BulkuploadData from './components/Officedata/BulkuploadData'
import CreateOrganization from './components/Organization/CreateOrganization';
import PartnershiprequestOrgId from './components/Admin/PartnershiprequestOrgId';
import Association_appdis from './components/Admin/Association_appdis';
import { ToastContainer } from "react-toastify";
import './App.css';

function App() {
  // For demo purposes, let's assume the user is logged in
  const isLoggedIn = false;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <Navigate to="/dashboard/sites" replace />
            ) : (
              <>
                <Hero />
                <Partners />
                <Subscriptions />
              </>
            )
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard/*" element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="/office-form" element={<OfficeFormManual/>}/>
          <Route path="/blulk-upload" element={<BulkuploadData/>}/>
          <Route path="/create-org" element={<CreateOrganization/>}/>
          <Route path="/partnershipreq" element={<PartnershiprequestOrgId/>}/>
          <Route path="/Associationdis" element={<Association_appdis/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;