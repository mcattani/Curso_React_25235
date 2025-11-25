/* Componente modal para editar / agregar producto.
   Si recibe un producto -> llena el formulario (editar)
   Si no -> formulario vacío (agregar)
*/

import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ModalProducto({ show, handleClose, producto, onGuardar }) {

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        stock: ""
    });

    // Cuando el modal se abre en modo "editar", cargamos los datos del producto al formulario
    useEffect(() => {
        if (producto) {
            setFormData({
                title: producto.title || "",
                price: producto.price?.toString() || "",
                image: producto.image || "",
                description: producto.description || "",
                stock: producto.stock ?? 0 // Si no hay stock -> 0
            });
        } else {
            // Si no hay producto, limpiamos el formulario (modo "agregar")
            setFormData({
                title: "",
                price: "",
                image: "",
                description: "",
                stock: 0
            });
        }
    }, [producto]);

    // Limpia el formulario al cerrar el modal
    useEffect(() => {
        if (!show) {
            setFormData({
                title: "",
                price: "",
                image: "",
                description: ""
            });
        }
    }, [show]);

    // Manejo de inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        // El stock debe ser un número entero
        if (name === "stock") {
            setFormData((prev) => ({
                ...prev,
                stock: Number(value)
            }));
            return;
        }
        // Resto de los campos (texto)
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Guardar (llama a la función que recibe desde Admin.jsx)
    function handleSubmit(e) {
        e.preventDefault();

        const priceNumber = Number(formData.price);

        // Validamos que la descripción tenga al menos 10 caracteres
        if (formData.description.trim().length < 10) {
            Swal.fire({
                icon: "error",
                title: "Descripción demasiado corta",
                text: "La descripción debe tener al menos 10 caracteres.",
            });
            return;
        }

        // Validamos la URL de la imagen (debe comenzar con http o https)
        if (!formData.image.trim().startsWith("http")) {
            Swal.fire({
                icon: "error",
                title: "URL de imagen inválida",
                text: "La URL de la imagen debe comenzar con http o https.",
            });
            return;
        }

        // Validamos que el precio sea un número válido mayor a 0
        if (isNaN(priceNumber) || priceNumber <= 0) {
            Swal.fire({
                icon: "error",
                title: "Precio inválido",
                text: "El precio debe ser un número mayor a 0.",
            });
            return;
        }

        // Convertimos el precio a número (number) antes de enviar
        const datosFormateados = {
            ...formData,
            price: Number(formData.price)
        };

        onGuardar(datosFormateados);
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {producto ? "Editar producto" : "Agregar producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="1" // Evita precios negativos o cero
                            // Arregla problemas de decimales en algunos navegadores
                            step="any"
                            inputMode="decimal"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min="0" // Evita stock negativo.
                            step="1" // Evita decimales
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL de la imagen</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://placehold.co/480x480"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            minLength={10}
                            required
                        />
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
