import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

// Importamos el contexto de productos
import { useProductos } from "../context/ProductosContext";

// Importamos el formulario modal para agregar / editar productos
import ModalProducto from '../components/ModalProducto';

export default function Admin() {
  const { productos, cargando, eliminarProducto, editarProducto } = useProductos();
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Mientras carga muestra un spinner 
  if (cargando) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  // Si no hay productos muestra un mensaje
  if (productos.length === 0) return (
    <Container className="mt-4">
      <Alert variant="info">No hay productos disponibles.</Alert>
    </Container>
  );

  // Función del hangle para manejar la eliminación de un producto
  function handleEliminar(producto) {
    Swal.fire({
      title: `¿Eliminar "${producto.title}" de la lista?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(producto.id);
      }
    });
  };

  // Función del handle para manejar la edición de un producto
  function handleEditar(producto) {
    setProductoSeleccionado(producto);
    setShowModal(true);
  }

  // Función del handle para cerrar el modal
  function handleCloseModal() {
    setProductoSeleccionado(null);
    setShowModal(false);
  }

  // Función del hangle para manejar la edición y agregado de productos
  function handleGuardarCambios(datosEditados) {
    if (productoSeleccionado) {
      // Editar producto
      editarProducto(productoSeleccionado.id, datosEditados);
    } else {
      // Aqui iría la función para agregar producto
      Swal.fire("Función no implementada", "Agregar producto aún no está disponible.", "info");
    }

    setShowModal(false);
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Panel de Administración de Productos</h1>
        {/* Agregar botón para agregar producto */}
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.title}</td>
              <td>${producto.price}</td>
              <td>{producto.description.slice(0, 100)}...</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditar(producto)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(producto)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Agregamos el modal */}
      <ModalProducto
        show={showModal}
        handleClose={handleCloseModal}
        producto={productoSeleccionado}
        onGuardar={handleGuardarCambios}
      />
    </Container>
  );
}  