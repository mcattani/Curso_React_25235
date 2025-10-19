import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

export default function Equipo() {

    const [equipo, setEquipo] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch("https://68e40e518e116898997adea7.mockapi.io/equipo")
            .then((res) => res.json())
            .then((data) => setEquipo(data))
            .catch((err) => console.error("Error al cargar el equipo:", err))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return (
        <div className="text-center mt-5">
            <Spinner animation="border" />
        </div>
    );

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Nuestro equipo</h2>
            <Row className="g-4">
                {equipo.map((persona) => (
                    <Col key={persona.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            className="h-100 text-center shadow border-0">
                            <Card.Img
                                variant="top"
                                src={persona.foto}
                                alt={persona.nombre}
                                className="img-fluid rounded-top"
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{persona.nombre}</Card.Title>
                                <Card.Subtitle className="text-muted">{persona.puesto}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}