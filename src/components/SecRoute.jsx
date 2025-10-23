import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SecRoute({ children }) {
    const {token} = useAuth();

    // Si existe el token "autoriza" children si no redirige a login
    return token ? children : <Navigate to ="/login"/>
}