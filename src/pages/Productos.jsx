import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";

export default function Productos({ carrito, setCarrito }) {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Función para agregar al carrito, usamos App() para "conectar" los componentes
    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
        //console.log(carrito);
    }

    useEffect(() => {
        fetch("https://dummyjson.com/products/category/smartphones?limit=12")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data.products)
            })
            // Si hay error de conexión -> catch
            .catch((error) => console.error("Error al obtener los productos de la API", error))
            // Finalmente (haya error o no cambiamos el valor del setCargando para no mostrar el spinner)
            .finally(() => setCargando(false))
    }, []);

    // Mientras carga muestra un spinner 
    if (cargando) return (
        <div className="text-center mt-2">
            <Spinner animation="border" />
        </div>
    );

    return (
        <div className="container" id="productos-api">
            <h1 className="text-center mb-4 mt-4">Nuestros Productos</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {productos.map((producto) => (
                    <div className="col" key={producto.id}>
                        <Card className="p-3">
                            <Card.Img variant="top" src={producto.images[0]} />
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
    );
}
