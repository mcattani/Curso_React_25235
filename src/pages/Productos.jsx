import { useState, useContext, useEffect } from "react";
import { Spinner, Card, Button, Alert, Container, InputGroup, Form } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { Helmet } from "react-helmet";

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Productos() {

    const { agregarAlCarrito } = useContext(CarritoContext);
    const { productos, cargando } = useProductos(); // -> Traemos produtos y estado de carga desde el contexto

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

    // Estado para la barra de búsqueda
    const [busqueda, setBusqueda] = useState("");

    // Estado para el debounce de la búsqueda
    const [textoDebounced, setTextoDebounced] = useState("");

    // Efecto para manejar el debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setTextoDebounced(busqueda);
        }, 700); // 700ms de retraso

        return () => {
            clearTimeout(handler); // limpiar el timeout si cambia la búsqueda
        };
    }, [busqueda]);

    // Filtrar productos por título o descripción
    const productosFiltrados = productos.filter(producto =>
        producto.title.toLowerCase().includes(textoDebounced.toLowerCase()) ||
        producto.description.toLowerCase().includes(textoDebounced.toLowerCase())
    );

    // Toast cuando no se encuentran productos
    useEffect(() => {
        // Si la búsqueda está vacía, no mostrar toast
        if (textoDebounced.trim() === "") return;

        // Mostrar toast si no hay productos filtrados
        if (productosFiltrados.length === 0) {
            toast.warn("No se encontraron productos que coincidan con tu búsqueda.", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark"
            });
        }
    }, [textoDebounced]);

    return (
        <>
            {/* SEO */}
            <Helmet>
                <title>Nuestros Productos | PhoneXpress</title>
                <meta
                    name="description"
                    content="Explora nuestro catálogo de smartphones disponibles en PhoneXpress."
                />
                <meta
                    name="keywords"
                    content="productos, smartphones, catálogo, celulares"
                />
                <meta property="og:title" content="Productos | PhoneXpress" />
                <meta
                    property="og:description"
                    content="Encuentra los mejores smartphones al mejor precio."
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="container" id="productos-api">
                <h1 className="text-center mb-4 mt-4">Nuestros Productos</h1>

                {/*Barra de búsqueda */}
                <div className="mb-4">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Buscar producto..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </InputGroup>
                </div>

                {/*Cards de productos */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {productosFiltrados.map((producto) => (
                        <div className="col" key={producto.id}>
                            <Card className="p-3">
                                <Card.Img variant="top" src={producto.image} />
                                <Card.Body>
                                    <Card.Title>{producto.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">${producto.price}</Card.Subtitle>
                                    <Card.Text>{producto.description}</Card.Text>
                                    <Button variant="primary" className="mt-auto" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
}
