import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, children, redirectTo="/landing" }) => {
  // check for user logged
  if(!isAllowed){
    return <Navigate to={redirectTo} />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute