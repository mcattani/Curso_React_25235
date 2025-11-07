import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

// Importamos el contexto de productos
import { useProductos } from "../context/ProductosContext";

export default function Admin() {
  const { productos, cargando, eliminarProducto } = useProductos();

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

  // Función para manejar la edición de un producto
  function handleEditar(producto) {
    Swal.fire({
      icon: "info",
      title: "Función no implementada",
      text: `Editar producto "${producto.title}" aún no está disponible.`,
    });
  };

  // Función para manejar la eliminación de un producto
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

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Panel de Administración de Productos</h1>

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
    </Container>
  );
}  