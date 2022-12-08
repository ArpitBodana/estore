import React, {  ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MapState } from "../Redux/Products/ProductType";
import { UserStateTypes } from "../Redux/User/UserTypes";

export type RouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: RouteProps) {
  const { user }: UserStateTypes = useSelector((state: MapState) => state.user);
  return user.access_token ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
