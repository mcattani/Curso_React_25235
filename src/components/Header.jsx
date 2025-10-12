import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header({ cantCarrito }) {

  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  // Función para cerrar la sesión --> borra el localStorage y reenvía a login
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

            {/* Enlace que se muestra solo si el usuario está autenticado */}
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/admin" style={{ color: '#17a2b8', fontWeight: 'bold', textDecoration: 'underline' }}
                >Admin</Nav.Link>
              </>
            )}
          </Nav>

          {/* Carrito y botones a la derecha */}
          <Nav className="d-flex align-items-center gap-2">
            <Nav.Link as={Link} to="/carrito" className="position-relative me-4">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cantCarrito > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.60rem" }}
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
                className="ms-2 text-nowrap"
                size="sm"
              >
                Login
              </Button>) : (
              <Button variant="outline-light" className='text-nowrap' onClick={cerrarSesion}>Cerrar sesión</Button>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

