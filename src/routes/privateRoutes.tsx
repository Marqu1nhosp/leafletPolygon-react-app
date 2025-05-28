import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoute() {
    const { isAuthenticated, loading } = useContext(AuthContext)
    console.log('isAuthenticated:', isAuthenticated);
    if (loading) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}