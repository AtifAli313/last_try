import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function AdminRoute({ children }) {
    const { user, isAuthenticated, isAuthReady } = useAuth();

    // Wait for auth to restore from localStorage
    if (!isAuthReady) return null;

    // Not logged in -> Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin -> Home
    if (user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Admin -> Allow access
    return children;
}

export default AdminRoute;
