// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showServiceRequestDropdown, setShowServiceRequestDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userRole from local storage
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServiceRequestDropdown = () => {
    setShowServiceRequestDropdown(!showServiceRequestDropdown);
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav id="navbar" className="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <img src="/images/CompanyLogo.png" alt="Company Logo" />
        </div>
        <ul id="menu" className={isMenuOpen ? 'overlay-menu' : ''}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userRole === 'Admin' && (
            <>
              <li>
                <Link to="/users/all-users">All Users</Link>
              </li>
              <li>
                <Link to="/user/all-products">All Products</Link>
              </li>
              <li>
                <Link to="/user/assign-product">Assign Products</Link>
              </li>
              <li>
                <div className="dropdown">
                  <Link to="#" onClick={toggleServiceRequestDropdown}>
                    Service Request
                  </Link>
                  {showServiceRequestDropdown && (
                    <div className="dropdown-content">
                      <Link to="/user/new-service-requests">New Service Requests</Link>
                      <Link to="/user/service-requests">Service Requests</Link>
                    </div>
                  )}
                </div>
              </li>
            </>
          )}
          {userRole === 'User' && (
            <>
              <li>
                <Link to="/user/all-products">All Products</Link>
              </li>
              <li>
                <Link to="/user/my-products">My Products</Link>
              </li>
              <li>
                <Link to="/user/my-request">My Service Request</Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
