import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './AuthService';

const AuthLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      alert('You have been logged out.');
      navigate('/auth/'); // Redirect to login page after logout
    }).catch(error => {
      alert(`Logout failed: ${error.message}`);
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default AuthLogout;
