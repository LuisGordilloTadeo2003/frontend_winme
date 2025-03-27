import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { BiLock, BiEnvelope, BiLogIn, BiUser, BiUserPlus } from 'react-icons/bi';
import "../auth/styles/WinMeAuth.css"

const WinMeAuth = () => {
    // Estado para controlar qué formulario mostrar
    const [showLogin, setShowLogin] = useState(true);

    // Estados para los datos del formulario de login
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Estados para los datos del formulario de registro
    const [registerData, setRegisterData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Estados para mensajes de error/éxito
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Estado para carga
    const [loading, setLoading] = useState(false);

    // Manejadores para cambiar entre formularios
    const navigateToRegister = () => {
        setShowLogin(false);
        setLoginError('');
        setSuccessMessage('');
    };

    const navigateToLogin = () => {
        setShowLogin(true);
        setRegisterError('');
        setSuccessMessage('');
    };

    // Manejador de submit para login
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');

        // Aquí iría tu lógica de autenticación
        console.log('Datos de login:', loginData);

        // Simulamos una respuesta después de 1.5 segundos
        setTimeout(() => {
            setLoading(false);
            // Simular éxito o error (en una app real esto vendría de tu API)
            if (loginData.email && loginData.password) {
                setSuccessMessage('¡Bienvenido de nuevo a WinMe!');
            } else {
                setLoginError('Por favor completa todos los campos');
            }
        }, 1500);
    };

    // Manejador de submit para registro
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setRegisterError('');

        // Validar que las contraseñas coincidan
        if (registerData.password !== registerData.confirmPassword) {
            setRegisterError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        // Aquí iría tu lógica de registro
        console.log('Datos de registro:', registerData);

        // Simulamos una respuesta después de 1.5 segundos
        setTimeout(() => {
            setLoading(false);
            // Simular éxito o error
            if (registerData.email && registerData.password && registerData.name) {
                setSuccessMessage('¡Cuenta creada con éxito! Bienvenido a WinMe');
                setShowLogin(true); // Redirigir a login después de registro exitoso
            } else {
                setRegisterError('Por favor completa todos los campos requeridos');
            }
        }, 1500);
    };

    return (
        <Container className="my-5" style={{ backgroundColor: "#333F8E" }}>
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <Card className="shadow-lg border-0 winme-card">
                        <Card.Body className="p-4">
                            {showLogin ? (
                                /* Escena de Inicio de Sesión */
                                <>
                                    <div className="text-center mb-4">
                                        <div className="icon-wrapper bg-gradient-primary d-inline-flex p-3 rounded-circle">
                                            <BiLock className="fs-2 text-white" />
                                        </div>
                                        <h3 className="winme-title">Accede a WinMe</h3>
                                        <p className="text-muted">Gana grandes premios hoy</p>
                                    </div>

                                    {loginError && <Alert variant="danger" className="border-0 winme-alert">{loginError}</Alert>}
                                    {successMessage && <Alert variant="success" className="border-0 winme-alert">{successMessage}</Alert>}

                                    <Form onSubmit={handleLoginSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="winme-label">Email</Form.Label>
                                            <div className="input-group winme-input-group">
                                                <span className="input-group-text winme-input-prepend">
                                                    <BiEnvelope />
                                                </span>
                                                <Form.Control
                                                    type="email"
                                                    className="winme-input"
                                                    value={loginData.email}
                                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                    placeholder="tu@email.com"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="winme-label">Contraseña</Form.Label>
                                            <div className="input-group winme-input-group">
                                                <span className="input-group-text winme-input-prepend">
                                                    <BiLock />
                                                </span>
                                                <Form.Control
                                                    type="password"
                                                    className="winme-input"
                                                    value={loginData.password}
                                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                    placeholder="••••••••"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </Form.Group>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <Form.Check
                                                type="checkbox"
                                                label="Recordarme"
                                                className="winme-checkbox"
                                            />
                                            <a href="#" className="winme-link">¿Olvidaste tu contraseña?</a>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-100 py-3 fw-bold winme-btn winme-btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="d-flex align-items-center justify-content-center">
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Cargando...
                                                </span>
                                            ) : (
                                                <>
                                                    <BiLogIn className="me-2" />
                                                    Iniciar Sesión
                                                </>
                                            )}
                                        </Button>

                                        <div className="text-center mt-3">
                                            <p className="text-muted mb-0">¿No tienes cuenta?</p>
                                            <Button
                                                variant="link"
                                                className="winme-link fw-bold"
                                                onClick={navigateToRegister}
                                            >
                                                Regístrate ahora
                                            </Button>
                                        </div>
                                    </Form>
                                </>
                            ) : (
                                /* Escena de Registro */
                                <>
                                    <div className="text-center mb-4">
                                        <div className="mb-0 icon-wrapper bg-gradient-primary d-inline-flex p-3 rounded-circle">
                                            <BiUserPlus className="fs-2 text-white" />
                                        </div>
                                        <h3 className="winme-title">Únete a WinMe</h3>
                                        <p className="text-muted">Comienza a ganar hoy</p>
                                    </div>

                                    {registerError && <Alert variant="danger" className="border-0 winme-alert">{registerError}</Alert>}
                                    {successMessage && <Alert variant="success" className="border-0 winme-alert">{successMessage}</Alert>}

                                    <Form onSubmit={handleRegisterSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="winme-label">Nombre</Form.Label>
                                                    <div className="input-group winme-input-group">
                                                        <span className="input-group-text winme-input-prepend">
                                                            <BiUser />
                                                        </span>
                                                        <Form.Control
                                                            type="text"
                                                            className="winme-input"
                                                            value={registerData.name}
                                                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                                            placeholder="Nombre"
                                                            required
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="winme-label">Apellidos</Form.Label>
                                                    <div className="input-group winme-input-group">
                                                        <span className="input-group-text winme-input-prepend">
                                                            <BiUser />
                                                        </span>
                                                        <Form.Control
                                                            type="text"
                                                            className="winme-input"
                                                            value={registerData.lastName}
                                                            onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                                                            placeholder="Apellidos"
                                                            required
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="winme-label">Email</Form.Label>
                                            <div className="input-group winme-input-group">
                                                <span className="input-group-text winme-input-prepend">
                                                    <BiEnvelope />
                                                </span>
                                                <Form.Control
                                                    type="email"
                                                    className="winme-input"
                                                    value={registerData.email}
                                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                                    placeholder="tu@email.com"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="winme-label">Contraseña</Form.Label>
                                                    <div className="input-group winme-input-group">
                                                        <span className="input-group-text winme-input-prepend">
                                                            <BiLock />
                                                        </span>
                                                        <Form.Control
                                                            type="password"
                                                            className="winme-input"
                                                            value={registerData.password}
                                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                                            placeholder="••••••••"
                                                            required
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="winme-label">Confirmar</Form.Label>
                                                    <div className="input-group winme-input-group">
                                                        <span className="input-group-text winme-input-prepend">
                                                            <BiLock />
                                                        </span>
                                                        <Form.Control
                                                            type="password"
                                                            className="winme-input"
                                                            value={registerData.confirmPassword}
                                                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                                            placeholder="••••••••"
                                                            required
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-4">
                                            <Form.Check
                                                type="checkbox"
                                                label="Acepto los términos y condiciones"
                                                className="winme-checkbox"
                                                required
                                            />
                                        </Form.Group>

                                        <Button
                                            type="submit"
                                            className="w-100 py-3 fw-bold winme-btn winme-btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="d-flex align-items-center justify-content-center">
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creando cuenta...
                                                </span>
                                            ) : (
                                                <>
                                                    <BiUserPlus className="me-2" />
                                                    Crear Cuenta
                                                </>
                                            )}
                                        </Button>

                                        <div className="text-center mt-3">
                                            <p className="text-muted mb-0">¿Ya tienes cuenta?</p>
                                            <Button
                                                variant="link"
                                                className="winme-link fw-bold"
                                                onClick={navigateToLogin}
                                            >
                                                Inicia Sesión
                                            </Button>
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WinMeAuth;