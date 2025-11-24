// Context con las funciones carrito, agregarAlCarrito y eliminarCarrito
import React, { createContext, useState } from "react";
import Swal from "sweetalert2";

// Importamos el contexto de productos para poder gestionar el stock
import { useProductos } from "./ProductosContext";

// Creamos el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const { descontarStock } = useProductos();

    // Función para agregar al carrito
    function agregarAlCarrito(producto) {

        // Si no hay stock, mostramos alerta y no agregamos al carrito
        if (producto.stock <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Sin stock",
                text: "Este producto no tiene más unidades disponibles."
            });
            return;
        }

        // Agrego al carrito
        setCarrito([...carrito, producto]);

        // Descuento 1 unidad del stock en la API y actualiza las cards
        descontarStock(producto.id);
    }

    // Función para vaciar el carrito (con confirmación, para uso del usuario)
    function eliminarCarrito() {
        Swal.fire({
            title: '¿Eliminar todo el carrito?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((res) => {
            if (res.isConfirmed) {
                // Borramos el carrito
                setCarrito([]);
                // Mostramos mensaje de eliminado
                Swal.fire('Eliminado', 'El carrito ha sido vaciado', 'success');
            }
        });
    }

    // Función para vaciar el carrito (sin confirmación, para uso interno de la app)
    function vaciarCarrito() {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}