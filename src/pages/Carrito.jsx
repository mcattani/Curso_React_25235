import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { CarritoContext } from "../context/CarritoContext";

export default function Carrito() {

    const { carrito, eliminarCarrito, vaciarCarrito } = useContext(CarritoContext);

    // Si no hay productos en el carrito
    if (carrito.length === 0) {
        return <p className="text-center mt-4">No hay productos en el carrito</p>;
    }

    // Calculamos el total
    let total = 0;
    for (let producto of carrito) {
        total += producto.price;
    }
    // Redondeamos el total a dos decimales
    total = Math.round(total * 100) / 100;

    // Función que se ejecuta al finalizar la compra
    function terminarCompra() {
        Swal.fire({
            title: 'Compra finalizada',
            text: `El total de su compra es $${total}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        vaciarCarrito();
    }

    return (
        <div className="container mt-3">
            <h2 className="text-center mb-3">Carrito de Compras</h2>
            {/*Tabla de resumen del carrito*/}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.map((producto, index) => (
                        <tr key={producto.id}>
                            <td>{index + 1}</td>
                            <td>{producto.title}</td>
                            <td>${producto.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/*Tabla de resumen del total*/}
            <div className="container my-3 d-flex flex-column align-items-center">
                <Table bordered style={{ width: "auto" }}>
                    <tbody>
                        <tr>
                            <td>Total a pagar:</td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="container my-3 d-flex flex-column align-items-center gap-3">
                    <Button variant="danger" onClick={eliminarCarrito}>
                        Eliminar Carrito
                    </Button>
                    <Button variant="success" onClick={terminarCompra}>
                        Terminar compra
                    </Button>
                </div>
            </div>
        </div>
    );
}