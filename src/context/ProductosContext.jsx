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

  // Función para eliminar los productos (DELETE)
  const eliminarProducto = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        // Actualizamos el estado local sin el producto eliminado
        setProductos(productos.filter((producto) => producto.id !== id));
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          text: "El producto fue eliminado correctamente.",
          timer: 1200,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el producto.",
        });
      });
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        obtenerProductos,
        eliminarProducto
        // agregarProducto,
        // editarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
