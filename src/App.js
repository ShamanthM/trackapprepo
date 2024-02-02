import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthConditionalNavbar from './utility/AuthConditionalNavbar';
import Home from './components/Home';
import Login from './utility/Login';
import ViewUsers from './pages/Users/ViewUsers';
import MyProducts from './pages/Users/MyProducts';
import AllProducts from './pages/Products/AllProducts';
import AssignProduct from './pages/Products/AssignProduct';
import NewServiceRequest from './pages/ServiceRequests/newServiceRequest'; // Import the NewServiceRequest component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = sessionStorage.getItem('authToken');
    return storedAuth !== null;
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    setIsAuthenticated(authToken !== null);
  }, []);

  const handleLogout = () => {
    // Perform logout actions, clear session data, etc.
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('authToken');

    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <Home />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* Private route, only accessible if authenticated */}
          <Route
            path="/users/all-users"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <ViewUsers />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Private route, only accessible if authenticated */}
          <Route
            path="/user/my-products"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <MyProducts />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* New route for All Products */}
          <Route
            path="/user/all-products"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <AllProducts />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* New route for AssignProduct */}
          <Route
            path="/user/assign-product"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <AssignProduct />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* New route for NewServiceRequest */}
          <Route
            path="/user/new-service-requests"
            element={
              isAuthenticated ? (
                <>
                  <AuthConditionalNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <NewServiceRequest />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
