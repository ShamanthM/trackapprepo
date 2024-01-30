import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userRole from local storage
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

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
          {userRole === 'Admin' && (
            <>
              <li>
                <Link to="/users/all-users">All Users</Link>
              </li>
              <li>
                <Link to="/users/all-products">All Products</Link>
              </li>
              <li>
                <Link to="/users/service-request">Service Request</Link>
              </li>
              <li>
                <Link to="/users/my-request">My Service Request</Link>
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
                <Link to="/users/my-request">My Service Request</Link>
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
