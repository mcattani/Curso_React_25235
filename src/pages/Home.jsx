import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";

export default function Home() {

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12}>
                    <h1 className="mb-5 text-center">Bienvenidos a PhoneXpress!</h1>
                </Col>
            </Row>
            <Row className="align-items-center">
                {/* Columna deñ Carousel */}
                <Col xs={12} md={6} className="mb-4 mb-md-0">
                    <Carousel fade interval={2500} controls={false} indicators={true}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="./src/assets/images/imagen1.jpg"
                                alt="Primera imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="./src/assets/images/imagen2.jpg"
                                alt="Segunda imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="./src/assets/images/imagen3.jpg"
                                alt="Tercera imagen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded shadow"
                                src="./src/assets/images/imagen4.jpg"
                                alt="Tercera imagen"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                {/* Columna con texto */}
                <Col xs={12} md={6}>
                  <p>En <strong>PhoneXpress</strong>, tu tienda online de confianza, te ofrecemos una experiencia única para que encuentres
                    el smartphone ideal.
                    Contamos con una amplia selección de dispositivos de última generación, desde modelos premium hasta
                    opciones accesibles para todos los gustos y necesidades.</p>
                </Col>
            </Row>
        </Container>
    );

};