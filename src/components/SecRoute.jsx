import { Children } from "react";
import { Navigate } from "react-router-dom";

export default function SecRoute({ children }) {
    const auth = localStorage.getItem("auth") === 'true';

    if (auth) {
        return children; // Si está autenticado, muestra el contenido protegido
    } else {
        return <Navigate to="/login" />; // Si no, redirige a login
    };
}