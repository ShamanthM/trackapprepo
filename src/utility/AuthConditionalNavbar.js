// AuthConditionalNavbar.js

import React from 'react';
import Navbar from '../components/Navbar';

const AuthConditionalNavbar = ({ isAuthenticated, handleLogout }) => {
  return isAuthenticated ? <Navbar handleLogout={handleLogout} /> : null;
};

export default AuthConditionalNavbar;
