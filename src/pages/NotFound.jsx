import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

export default function NotFound() {
    return (
        <>
            {/* SEO */}
            <Helmet>
                <title>404 - Página no encontrada | PhoneXpress</title>
                <meta
                    name="description"
                    content="La página que estás buscando no existe en PhoneXpress."
                />
                <meta property="og:title" content="404 - Página no encontrada" />
                <meta
                    property="og:description"
                    content="No pudimos encontrar la página solicitada."
                />
                <meta name="robots" content="noindex" />
                <meta property="og:type" content="website" />
            </Helmet>
            
            <Container className="text-center my-5">
                <h1 className="display-3 fw-bold text-danger">404</h1>
                <h2 className="mb-3">Página no encontrada</h2>
                <p className="text-muted mb-4">
                    Lo sentimos, la página que estás buscando no existe.
                </p>
            </Container>
        </>
    );
}