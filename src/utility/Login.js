import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = e.target.elements.username.value;
    const userPassword = e.target.elements.password.value;

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: userName, UserPassword: userPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user } = data;

        localStorage.setItem('userRole', user.UserRole);
        localStorage.setItem('userData', JSON.stringify({
          userId: user.UserID,
          userName: user.UserName,
        }));

        // Update isAuthenticated to true in both localStorage and sessionStorage
        localStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('authToken', 'true');
        
        setIsAuthenticated(true);
        navigate('/');
      } else {
        console.error('Error logging in:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <div className={`frame ${isSignIn ? '' : 'frame-long'}`}>
        <form className={`form-${isSignIn ? 'signin' : 'signup'}`} onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="username" className="form-styling" />
          <label>Password:</label>
          <input type="password" name="password" className="form-styling" />
          <button type="submit" className={`btn-${isSignIn ? 'signin' : 'signup'}`}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;