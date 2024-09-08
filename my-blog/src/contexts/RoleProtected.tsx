// src/components/RoleProtected.tsx
import React from 'react';
import { useUserRole } from '../contexts/UserRoleContext';
import UserTypes from '../models/ADTs/UserType';

interface RoleProtectedProps {
  roles: UserTypes[];
  fallback?: JSX.Element;
  children: React.ReactNode; // Add this to allow children
}

// Higher-Order Component to protect based on user role

const RoleProtected: React.FC<RoleProtectedProps> = ({ roles, fallback, children }) => {
  const { userRole } = useUserRole();

  if (userRole && roles.includes(userRole)) {
    return <>{children}</>; // Render the children if the role matches
  }

  // return fallback || <p>You do not have access to view this content.</p>; // Fallback message
  return fallback || <></>; // Fallback message
};

export default RoleProtected;
