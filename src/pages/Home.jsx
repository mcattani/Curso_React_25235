import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

export default function Home() {
    return (
        <Container className="my-5">
            <Row>
                <Col xs={12}>
                    <h1 className="mb-5 text-center fw-bold display-5">
                        ¡Bienvenido a PhoneXpress!
                    </h1>
                </Col>
            </Row>

            <Row className="align-items-center">
                {/* Columna del Carousel */}
                <Col xs={12} md={6} className="mb-4 mb-md-0">
                    <div className="w-75">
                    <Carousel fade interval={2000} controls={false} indicators={true}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="/images/imagen1.webp"
                                alt="Primera imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="/images/imagen2.webp"
                                alt="Segunda imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="/images/imagen3.webp"
                                alt="Tercera imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="/images/imagen4.webp"
                                alt="Cuarta imagen"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                </Col>
                

                {/* Columna con texto */}
                <Col xs={12} md={6}>
                    <p className="fs-5 mb-3">
                        En <strong>PhoneXpress</strong>, tu tienda online de confianza, te ofrecemos una experiencia única para que encuentres el <strong>smartphone ideal</strong>.
                    </p>
                    <p className="fs-5 mb-3">
                        Nuestra misión es acercarte la mejor tecnología con la máxima comodidad, combinando variedad, calidad y precios competitivos.
                    </p>
                    <p className="fs-5 mb-3">
                        Contamos con una amplia selección de dispositivos de última generación: desde modelos premium con las prestaciones más avanzadas hasta <strong>opciones accesibles</strong> que se adaptan a todos los gustos y presupuestos.
                    </p>
                    <p className="fs-5 mb-3">
                        Además, te ofrecemos asesoramiento personalizado, envíos rápidos y garantía oficial para que compres con total tranquilidad.
                    </p>
                    <p className="fs-5 mb-3">
                        En <strong>PhoneXpress</strong> creemos que la innovación está al alcance de todos.  
                        Por eso trabajamos cada día para que disfrutes de la mejor tecnología al mejor precio y con la mejor atención.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
