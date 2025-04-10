import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Optionally return null while redirecting
  if (!token) return null;

  return <>{children}</>;
};

export default UserProtectedWrapper;
