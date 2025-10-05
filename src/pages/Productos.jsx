import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";


export default function Productos() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    function handleClick() {
        Swal.fire({
            title: "🚧 En construcción",
            text: "Esta funcionalidad estará disponible próximamente.",
            icon: "info",
            confirmButtonText: "Aceptar",
        });
    };

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

    // Mientras carga muestra un spinner de bootstrap
    if (cargando) return (
        <div className="text-center mt-2">
            <Spinner animation="border" />
        </div>
    );

    //console.log(productos) // Debugging

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
                                <Button variant="primary" className="mt-auto" onClick={handleClick}>Agregar al Carrito</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
