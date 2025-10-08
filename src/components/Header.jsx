import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header({cantCarrito}) {

  return (
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container id="home">
        <Navbar.Brand as={Link} to="/">PhoneXpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productos">Nuestros Productos</Nav.Link>
            <Nav.Link as={Link} to="/equipo">Quienes somos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* Carrito a la derecha */}
          <Nav>
            <Nav.Link as={Link} to="/carrito" className="position-relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cantCarrito > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  {cantCarrito}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

