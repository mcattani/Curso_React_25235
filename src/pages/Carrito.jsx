import React from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Carrito({ elemCarrito, setCarrito }) {
    // Si no hay productos en el carrito
    if (elemCarrito.length === 0) {
        return <p className="text-center mt-4">No hay productos en el carrito</p>;
    }

    // Calculamos el total (probablemente haya un método de array para hacer esto...)
    let total = 0;
    for (let producto of elemCarrito) {
        total += producto.price;
    }
    // Redondeamos el total a dos decimales
    total = Math.round(total*100) / 100;

    

    // Función que se ejecuta al finalizar la compra
    function terminarCompra() {
        Swal.fire({
            title: 'Compra finalizada',
            text: `El total de su compra es $${total}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    // Función alerta para eliminar el carrito
    function eliminarCarrito() {
        Swal.fire({
            title: '¿Eliminar todo el carrito?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((res) => {
            if (res.isConfirmed) {
                // Borramos el carrito
                setCarrito([]);
                // Mostramos mensaje de eliminado
                Swal.fire('Eliminado', 'El carrito ha sido vaciado', 'success');
            }
        });
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
                    {elemCarrito.map((producto, index) => (
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