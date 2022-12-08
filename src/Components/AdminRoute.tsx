import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MapState } from '../Redux/Products/ProductType';
import { UserStateTypes } from '../Redux/User/UserTypes';
import { RouteProps } from './ProtectedRoute';

function AdminRoute({ children }: RouteProps) {
    const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
    return user.role==="admin" ? children : <Navigate to="/signin" />;
}

export default AdminRoute