import React from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';

const RegisterForm = ({ formData, errors, success, loading, acceptedTerms, passwordShown, onInputChange, onAcceptedTermsChange, onSubmit, onSwitchForm }) => {
    const getPasswordStrength = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        // Caracteres especiales ampliados: !@#$%^&*()_+-=[]{}|;':",./<>?`~
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;':",.\/<>?`~]/.test(password);

        // Calculamos un score basado en los criterios opcionales
        const optionalScore = [hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;

        // Solo los 8 caracteres son obligatorios
        if (!hasMinLength) {
            return {
                percentage: Math.min(100, (password.length / 8) * 100),
                color: '#dc3545', // Rojo
                message: 'Mínimo 8 caracteres',
                suggestion: ''
            };
        }

        // Evaluamos la fortaleza basada en criterios opcionales
        switch (optionalScore) {
            case 3:
                return {
                    percentage: 100,
                    color: '#28a745', // Verde
                    message: 'Contraseña excelente',
                    suggestion: ''
                };
            case 2:
                return {
                    percentage: 75,
                    color: '#17a2b8', // Azul claro
                    message: 'Contraseña fuerte',
                    suggestion: hasSpecialChar ? '' : 'Añade un símbolo (!@#$...)'
                };
            case 1:
                return {
                    percentage: 50,
                    color: '#ffc107', // Amarillo
                    message: 'Contraseña aceptable',
                    suggestion: (() => {
                        if (!hasUpperCase) return 'Añade una mayúscula';
                        if (!hasNumber) return 'Añade un número';
                        return 'Añade un símbolo (!@#$...)';
                    })()
                };
            default:
                return {
                    percentage: 25,
                    color: '#6c757d', // Gris
                    message: 'Contraseña básica',
                    suggestion: 'Añade mayúsculas, números o símbolos'
                };
        }
    };

    const handleSurnameChange = (e) => {
        const fullSurname = e.target.value;
        const [firstSurname = '', secondSurname = ''] = fullSurname.trim().split(/\s+/);

        // Actualizamos ambos campos en el formData
        onInputChange('firstSurname', firstSurname);
        onInputChange('secondSurname', secondSurname);

        // Mantenemos también el campo completo para mostrar en el input
        onInputChange('fullSurname', fullSurname);
    };

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
                    maxWidth: '600px',
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
                        Crea tu Cuenta
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ color: '#94a3b8' }}
                    >
                        Únete a nuestra plataforma y comienza tu experiencia
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

                    <Form.Group controlId="nameGroup" className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Label style={{ color: '#e2e8f0' }}>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => onInputChange('name', e.target.value)}
                                    required
                                    className="py-3 rounded-3 border-0"
                                    style={{
                                        backgroundColor: '#334155',
                                        color: '#f8fafc'
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <Form.Label style={{ color: '#e2e8f0' }}>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.fullSurname || `${formData.firstSurname || ''} ${formData.secondSurname || ''}`.trim()}
                                    onChange={handleSurnameChange}
                                    required
                                    className="py-3 rounded-3 border-0"
                                    style={{
                                        backgroundColor: '#334155',
                                        color: '#f8fafc'
                                    }}
                                />
                            </div>
                        </div>
                    </Form.Group>

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

                    <Form.Group controlId="password" className="mb-3">
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
                        {formData.password.length > 0 && (
                            <div className="mt-2">
                                {/* Barra de progreso visual */}
                                <div style={{
                                    height: '6px',
                                    backgroundColor: '#e9ecef',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                    marginBottom: '5px'
                                }}>
                                    <div style={{
                                        width: `${getPasswordStrength(formData.password).percentage}%`,
                                        height: '100%',
                                        backgroundColor: getPasswordStrength(formData.password).color,
                                        transition: 'all 0.3s ease'
                                    }}></div>
                                </div>

                                {/* Texto descriptivo */}
                                <small style={{
                                    color: getPasswordStrength(formData.password).color,
                                    fontWeight: 500,
                                    fontSize: '0.85rem'
                                }}>
                                    {formData.password.length >= 8 ? '✓ ' : '✗ '}
                                    {getPasswordStrength(formData.password).message}
                                    {getPasswordStrength(formData.password).suggestion && (
                                        <span style={{ color: '#6c757d', marginLeft: '5px' }}>
                                            ({getPasswordStrength(formData.password).suggestion})
                                        </span>
                                    )}
                                </small>
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group controlId="terms" className="mb-4">
                        <div className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={onAcceptedTermsChange}
                                required
                                className="me-2"
                                style={{ color: '#e2e8f0' }}
                            />
                            <span style={{ color: '#94a3b8' }}>
                                Acepto los <a href="#" style={{ color: '#60a5fa' }}>términos y condiciones</a>
                            </span>
                        </div>
                    </Form.Group>

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
                            {loading ? 'Creando cuenta...' : 'Registrarse'}
                        </Button>
                    </motion.div>

                    <div className="text-center mt-4">
                        <p style={{ color: '#94a3b8' }}>
                            ¿Ya tienes una cuenta?{' '}
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
                                Inicia sesión aquí
                            </Button>
                        </p>
                    </div>
                </Form>
            </motion.div>
        </div>
    );
};

export default RegisterForm;