import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./LogInContext.jsx";

const CarritoContext = createContext(null);

// eslint-disable-next-line
export function useCarrito() {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
}

export function CarritoProvider({ children }) {
    const { usuario, isAuthenticated } = useAuth();
    const [carritoId, setCarritoId] = useState(null);
    const [loadingCarrito, setLoadingCarrito] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    // Obtener el ID del carrito asociado al usuario
    useEffect(() => {
        const obtenerCarrito = async () => {
            if (!isAuthenticated || !usuario?.id_usuario) {
                setCarritoId(null);
                return;
            }

            setLoadingCarrito(true);
            try {
                const response = await fetch(`${apiUrl}/carrito/usuario/${usuario.id_usuario}`);
                const data = await response.json();
                
                if (data.success && data.data) {
                    setCarritoId(data.data.id_carrito);
                } else {
                    console.error("No se pudo obtener el carrito:", data.message);
                }
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            } finally {
                setLoadingCarrito(false);
            }
        };

        obtenerCarrito();
    }, [usuario?.id_usuario, isAuthenticated, apiUrl]);

    const value = {
        carritoId,
        loadingCarrito
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
}

export default CarritoContext;
