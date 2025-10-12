import { Container } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container className="text-center my-5">
            <h1 className="display-3 fw-bold text-danger">404</h1>
            <h2 className="mb-3">Página no encontrada</h2>
            <p className="text-muted mb-4">
                Lo sentimos, la página que estás buscando no existe.
            </p>
        </Container>
    );
}