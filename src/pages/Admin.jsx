import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

// Importamos el contexto de productos
import { useProductos } from "../context/ProductosContext";

// Importamos el formulario modal para agregar / editar productos
import ModalProducto from '../components/ModalProducto';

export default function Admin() {
  const { productos, cargando, eliminarProducto, editarProducto, agregarProducto } = useProductos();
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Mientras carga muestra un spinner 
  if (cargando) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  // Si no hay productos muestra un mensaje
  //if (productos.length === 0) return (
  //  <Container className="mt-4">
  //    <Alert variant="info">No hay productos disponibles.</Alert>
  //  </Container>
  //);

  // Función del handle para manejar la eliminación de un producto
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
      agregarProducto(datosEditados);
    }

    setShowModal(false);
  }

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Panel Admin | PhoneXpress</title>
        <meta
          name="description"
          content="Portal de administración de gestión de productos."
        />
        <meta
          name="keywords"
          content="admin, panel, dashboard, crud, administración"
        />
        <meta property="og:title" content="Panel Admin - PhoneXpress" />
        <meta
          property="og:description"
          content="Panel de gestión interna de PhoneXpress."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" /> {/* Evita que los motores de búsqueda indexen esta página */}
      </Helmet>

      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Panel de Administración de Productos</h1>
        </div>

        <div className="p-3 mb-4 bg-body-tertiary rounded shadow-sm text-center">
          <Button
            variant="success"
            size="lg"
            onClick={() => {
              setProductoSeleccionado(null); // Formulario vacío (agregar)
              setShowModal(true); // Mostrar modal
            }}
          >
            ➕ Agregar producto
          </Button>
        </div>

        {/*El botón de agregar producto siempre se muestra. Si no hay productos se muestra un mensaje*/}
        {productos.length === 0 ? (
          <Alert variant="info" className="text-center">
            No hay productos disponibles.
          </Alert>
        ) : (

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
        )}

        {/* Agregamos el modal */}
        <ModalProducto
          show={showModal}
          handleClose={handleCloseModal}
          producto={productoSeleccionado}
          onGuardar={handleGuardarCambios}
        />
      </Container>
    </>

  );
}  