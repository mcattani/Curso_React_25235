// Context con las funciones de login y token simulado

import { createContext, useContext, useState } from "react";

// Creamos el contexto
const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
    // Inicializamos el token leyendo el localStorage
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    // Función de login con token simulado
    function login(username, password) {
        // Si el usuario y password es correcto
        if (username === "admin" && password === "1234") {
            // JWT generado por jwt.io
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZX0.3Vct74BAuXJCWarfXRN_QtqQnESpiU04gEQxfNHge9g"
            setToken(token);
            // Guardamos el token
            localStorage.setItem('token', token);
            return true;
        }
        // Si no es correcto
        return false;
    };

    function logout() {
        // Quitamos el token del useState y del localStorage
        setToken(null);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
        
    );
};

export const useAuth = () => useContext(AuthContext);
