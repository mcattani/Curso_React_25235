// Context con las funciones carrito, agregarAlCarrito y eliminarCarrito

import React, { createContext, useState } from "react";
import Swal from "sweetalert2";

// Creamos el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Función para agregar al carrito
    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
        //console.log(carrito);
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