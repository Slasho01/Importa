import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Importa el contexto de autenticación
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const CustomNavbar = () => {
    const { token, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Función para cerrar sesión
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/">
                <span style={{ color: '#ff7f50' }}>Logo</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">
                        Inicio
                    </Nav.Link>
                    <Nav.Link as={Link} to="/productos">
                        Productos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/servicios">
                        Servicios
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contacto">
                        Contacto
                    </Nav.Link>
                    {token ? (
                        <>
                            <NavDropdown title="Mi Cuenta" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/perfil">
                                    Mi Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/prealertas">
                                    Mis Prealertas
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* Ejemplo de otro elemento condicional */}
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login">
                            <Button variant="outline-dark">Login</Button>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
