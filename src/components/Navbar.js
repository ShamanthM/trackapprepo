import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faBars} className="menuIcon" onClick={toggleMenu} />
          </Link>
        </div>
        <ul id="menu" className={isMenuOpen ? 'overlay-menu' : ''}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users/all-users">All Users</Link>
          </li>
          <li>
            <Link to="/users/all-products">All Products</Link>
          </li>
          <li>
            <Link to="/user/my-products">My Products</Link>
          </li>
          <li>
            <Link to="/users/assign-products">Assign Products</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
