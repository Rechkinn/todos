import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  if (localStorage.getItem("accessToken")) return <Outlet />;
  return <Navigate to="/signup" />;
}
