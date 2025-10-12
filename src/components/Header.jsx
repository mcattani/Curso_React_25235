import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header({cantCarrito}) {

  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  // Función para cerrar la sesión --> borra el localStorage
  function cerrarSesion() {
    localStorage.removeItem('auth');
    navigate('/login');
  }

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

            {/* Mostrar botón de login o logout según isAuth */}
            {!isAuth ? (
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className="ms-2"
              >
                Login
              </Button>) : (
                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
              )
           }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

