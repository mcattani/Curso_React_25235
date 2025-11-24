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

        setCarrito(prev => {
            // Ver si el producto ya está en el carrito
            const existe = prev.find(item => item.id === producto.id);

            if (existe) {
                // Si ya existe -> aumentar la cantidad en 1
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            // Si no existe → agregarlo con cantidad 1
            return [...prev, { ...producto, cantidad: 1 }];
        });

        // Descontar stock en la API
        descontarStock(producto.id);
    }

    // Función para vaciar el carrito (con confirmación)
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

    // Función para vaciar el carrito (sin confirmación)
    function vaciarCarrito() {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}