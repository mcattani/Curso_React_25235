import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <Container>
                <hr className="hr hr-blurry" />

                {/*Iconos de contacto*/}
                <div className="mb-2">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" className="social-icon" style={{ margin: "0 10px" }} />
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon" style={{ margin: "0 10px" }} />
                    <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" style={{ margin: "0 10px" }} />
                    <FontAwesomeIcon icon={faXTwitter} size="2x" className="social-icon" style={{ margin: "0 10px" }} />
                </div>

                <p className="mb-0">2025 🄯 - Todos los errores reservados.</p>
            </Container>
        </footer>
    );
}