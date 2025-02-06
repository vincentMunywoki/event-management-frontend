import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isGuest = localStorage.getItem('isGuest'); // Check if the user is a guest

  // If the user is not logged in and is not a guest, redirect to login
  if (!token && !isGuest) {
    return <Navigate to='/login' />;
  }

  // If the user is a guest, restrict access to the dashboard
  if (isGuest) {
    return <Navigate to='/limited-features' />;
  }

  // If logged in, allow access to the children (Dashboard)
  return children;
};

export default ProtectedRoute;
