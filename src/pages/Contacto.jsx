import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

export default function Contacto() {

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    // Función que maneja el cambio de eventos del formulario
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Función que maneja el submit
    function handleSubmit(e) {
        e.preventDefault();

        // Usamos formspree que utiliza el método post
        fetch("https://formspree.io/f/mwplyzqo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Mensaje enviado!",
                    text: "Gracias por contactarte con nosotros.",
                    confirmButtonColor: "#0d6efd",
                    timer: 1000,
                    showConfirmButton: false
                });
                setFormData({ nombre: "", email: "", mensaje: "" });
            } else {
                // Si ocurre un error
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar",
                    text: "Por favor, intenta nuevamente más tarde.",
                    confirmButtonColor: "#dc3545"
                });
            }
        });
    };

    return (
        <>
            {/* SEO */}
            <Helmet>
                <title>Contacto | PhoneXpress</title>
                <meta
                    name="description"
                    content="Ponete en contacto con PhoneXpress para consultas, soporte o información sobre nuestros productos."
                />
                <meta
                    name="keywords"
                    content="contacto, soporte, ayuda, phonexpress, consultas"
                />
                <meta property="og:title" content="Contacto - PhoneXpress" />
                <meta
                    property="og:description"
                    content="Escribinos para recibir asistencia o información personalizada."
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <Container className="my-5" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4 fw-bold">Envíenos su Consulta</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                            minLength="4"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingrese su email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mensaje">
                        <Form.Label>Mensaje:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            placeholder="Ingrese su consulta"
                            minLength="10"
                            required
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Enviar Consulta
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}