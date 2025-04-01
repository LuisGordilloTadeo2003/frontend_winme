import React from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const LoginForm = ({ formData, errors, success, loading, passwordShown, onInputChange, onSubmit, onSwitchForm }) => {
    return (
        <div style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 p-md-5 rounded-4 shadow-lg"
                style={{
                    backgroundColor: '#1e293b',
                    width: '100%',
                    maxWidth: '500px',
                    border: '1px solid #334155'
                }}
            >
                <div className="text-center mb-4">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            color: '#e2e8f0',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            marginBottom: '1.5rem'
                        }}
                    >
                        Inicia Sesión
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ color: '#94a3b8' }}
                    >
                        Accede a tu cuenta para continuar
                    </motion.p>
                </div>

                <Form onSubmit={onSubmit}>
                    {success && (
                        <Alert variant="success" className="text-center rounded-3">
                            {success}
                        </Alert>
                    )}
                    {errors && (
                        <Alert variant="danger" className="text-center rounded-3">
                            {errors}
                        </Alert>
                    )}

                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label style={{ color: '#e2e8f0' }}>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => onInputChange('email', e.target.value)}
                            required
                            className="py-3 rounded-3 border-0"
                            style={{
                                backgroundColor: '#334155',
                                color: '#f8fafc'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-4">
                        <Form.Label style={{ color: '#e2e8f0' }}>Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => onInputChange('password', e.target.value)}
                                required
                                className="py-3 rounded-3 border-0"
                                style={{
                                    backgroundColor: '#334155',
                                    color: '#f8fafc'
                                }}
                            />
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-end mb-4">
                        <Button
                            variant="link"
                            onClick={() => { }} // Aquí iría tu función para recuperar contraseña
                            style={{
                                color: '#60a5fa',
                                textDecoration: 'none',
                                padding: '0',
                                fontWeight: '500'
                            }}
                        >
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mb-3"
                    >
                        <Button
                            className="w-100 py-3 rounded-3 border-0"
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: '#3b82f6',
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {loading ? 'Iniciando sesión...' : 'Ingresar'}
                        </Button>
                    </motion.div>

                    <div className="text-center mt-4">
                        <p style={{ color: '#94a3b8' }}>
                            ¿No tienes una cuenta?{' '}
                            <Button
                                variant="link"
                                onClick={onSwitchForm}
                                style={{
                                    color: '#60a5fa',
                                    textDecoration: 'none',
                                    padding: '0',
                                    fontWeight: '600'
                                }}
                            >
                                Regístrate aquí
                            </Button>
                        </p>
                    </div>
                </Form>
            </motion.div>
        </div>
    );
};

export default LoginForm;