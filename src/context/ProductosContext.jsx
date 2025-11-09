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
        setProductos((prev) => prev.filter((producto) => producto.id !== id));
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
  };

  // Función para editar los productos (PUT)
  const editarProducto = (id, datosActualizados) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados),
    })
      .then((res) => res.json())
      .then((data) => {
        // Actualizamos el producto editado en el estado local
        setProductos((prevProductos) =>
          prevProductos.map((producto) =>
            producto.id === id ? data : producto
          )
        );
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "Los cambios fueron guardados correctamente.",
          timer: 1200,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el producto.",
        });
      });
  };

  // Función para agregar productos (POST)
  function agregarProducto(nuevoProducto) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    })
      .then((res) => res.json())
      .then((data) => {
        // Agregamos el nuevo producto al estado local
        setProductos((prevProductos) => [...prevProductos, data]);
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto fue agregado correctamente.",
          timer: 1200,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el producto.",
        });
      });
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        obtenerProductos,
        eliminarProducto,
        editarProducto, 
        agregarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
