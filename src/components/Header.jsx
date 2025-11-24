import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { CarritoContext } from '../context/CarritoContext';
import { useContext } from 'react';

// Importamos contexto Autenticación
import { useAuth } from '../context/AuthContext';

export default function Header() {

  // Contexto Carrito
  const { carrito } = useContext(CarritoContext)
  const cantCarrito = carrito.length

  // Contexto Login
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  // Función para cerrar la sesión --> borra el localStorage y reenvía a login
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container id="home">
        <Navbar.Brand as={Link} to="/">PhoneXpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/productos">Nuestros Productos</Nav.Link>
            <Nav.Link as={Link} to="/equipo">Quienes somos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>

            {token && (
              <Nav.Link
                as={Link}
                to="/admin"
                style={{ color: '#17a2b8', fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* Carrito */}
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/carrito" className="position-relative me-3">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cantCarrito > 0 && (
                <span
                  className="badge rounded-pill bg-danger position-absolute"
                  style={{ fontSize: "0.60rem" }}
                >
                  {cantCarrito}
                </span>
              )}
            </Nav.Link>
          </Nav>

          {/* Botón Login / Cerrar Sesión */}
          <div className="d-flex align-items-center">
            {!token ? (
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className="px-3 text-nowrap"
                size="sm"
              >
                Login
              </Button>
            ) : (
              <Button
                variant="outline-light"
                className="px-3 text-nowrap"
                size="sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            )}
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

