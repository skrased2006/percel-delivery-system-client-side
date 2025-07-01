import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation(); // ✅ এটা যোগ করো

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/forbidden" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
