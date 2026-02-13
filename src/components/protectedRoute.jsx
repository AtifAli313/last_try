import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAuthReady, user } = useAuth();

  if (!isAuthReady) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role && user?.role !== role) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
