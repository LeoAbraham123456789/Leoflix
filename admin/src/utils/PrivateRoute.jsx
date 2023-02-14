import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext/AuthContext';

export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
  return (
    
    user? <Outlet/> : <Navigate to="/login"/>
    
  );
}
