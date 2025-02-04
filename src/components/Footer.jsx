import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
    <p className="mb-2">&copy; 2025 Hesham. All rights reserved.</p>
    <p className="space-x-4">
      <a href="#" className="hover:text-gray-400">Privacy Policy</a> | 
      <a href="#" className="hover:text-gray-400">Terms of Service</a> | 
      <a href="#" className="hover:text-gray-400">Contact Us</a>
    </p>
  </footer>

  );
};

export default Footer;