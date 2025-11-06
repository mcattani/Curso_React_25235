import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

// Creamos el contexto
const ProductosContext = createContext();

// Proveedor del contexto
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const API_URL = "https://68e40e518e116898997adea7.mockapi.io/products";

    useEffect(() => {
    obtenerProductos();
  }, []);

  // Función para obtener los productos (GET)
  const obtenerProductos = () => {
    setCargando(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se recibieron datos válidos de la API.",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los productos.",
        });
      })
      .finally(() => setCargando(false));
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        obtenerProductos,
        // agregarProducto,
        // editarProducto,
        // eliminarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
