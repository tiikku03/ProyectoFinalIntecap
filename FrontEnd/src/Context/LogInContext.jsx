import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

// Hook personalizado para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verificar si hay un usuario guardado en localStorage al cargar
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            try {
                const userData = JSON.parse(usuarioGuardado);
                setUsuario(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error al parsear usuario guardado:", error);
                localStorage.removeItem('usuario');
            }
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = (userData) => {
        setUsuario(userData);
        setIsAuthenticated(true);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    // Función para cerrar sesión
    const logout = () => {
        setUsuario(null);
        setIsAuthenticated(false);
        localStorage.removeItem('usuario');
    };

    // Verificar si el usuario es admin
    const isAdmin = () => {
        return usuario?.rol === 'admin';
    };

    // Verificar si el usuario es cliente
    const isCliente = () => {
        return usuario?.rol === 'usuario' || usuario?.rol === 'cliente';
    };

    const value = {
        usuario,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
        isCliente
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;