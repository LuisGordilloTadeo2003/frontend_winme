import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import "../styles/WinMeAuth.css"

const AuthLayout = ({ children }) => {
    return (
        <Container className="auth-container" fluid>
            <Row className="justify-content-center align-items-center m-0" style={{ height: '100vh' }}>
                <Col xs={12} md={10} lg={8} xl={6} className="p-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: '100%' }}
                    >
                        <Card className="auth-card h-100" style={{ backgroundColor: "#0f172a", border: 0 }}>
                            <Card.Body className="p-3 p-md-4 d-flex flex-column">
                                {children}
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthLayout;