import { Navigate, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    function handleLogin(e) {
        e.preventDefault();

        const success = login(usuario, password);

        // Chequeamos que haya algo ingresado
        if (usuario.trim() === '' || password.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        // Si se ingresaron los datos correctamente
        // Usuario: admin / Contraseña: 1234
        if (success) {
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Autenticación exitosa',
                showConfirmButton: false,
                timer: 1100
            }).then(() => {
                navigate('/admin');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'Usuario o contraseña incorrectos',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5"
            style={{ minHeight: '70vh' }}
        >
            <Card className="p-4 shadow-sm" style={{ width: '100%', maxWidth: 400 }}>
                <h3 className="text-center mb-4">Iniciar sesión</h3>

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="usuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu usuario (admin)"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu contraseña (1234)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                            Entrar
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}