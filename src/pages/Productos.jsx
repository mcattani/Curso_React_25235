import { useContext } from "react";
import { Spinner, Card, Button, Alert, Container } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { Helmet } from "react-helmet";

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
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {productos.map((producto) => (
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
        </>
    );
}
