import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '../auth/layouts/AuthLayout';
import LoginForm from '../auth/components/LoginForm';
import RegisterForm from '../auth/components/RegisterForm';
import "../auth/styles/WinMeAuth.css";
import { useAuth } from '../auth/hooks/useAuth';

const WinMeAuth = () => {
    const [activeForm, setActiveForm] = useState('login');
    const [formData, setFormData] = useState({
        login: { email: '', password: '' },
        register: { name: '', firstSurname: '', secondSurname: '', email: '', password: '' }
    });
    const [errors, setErrors] = useState({ login: '', register: '' });
    const [success, setSuccess] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Usamos el hook de autenticación
    const { login, register, loading, error } = useAuth();

    useEffect(() => {
        setErrors({ login: '', register: '' });
        setSuccess('');
    }, [activeForm]);

    const handleInputChange = (form, field, value) => {
        setFormData(prev => ({
            ...prev,
            [form]: { ...prev[form], [field]: value }
        }));
    };

    const switchForm = (form) => {
        setActiveForm(form);
    };

    const validateForm = (formType) => {
        const { email, password, name, firstSurname } = formData[formType];
        let isValid = true;
        let newErrors = { ...errors };

        if (!email) {
            newErrors[formType] = 'El email es requerido';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors[formType] = 'Email no válido';
            isValid = false;
        }

        if (formType === 'register') {
            if (!name) {
                newErrors[formType] = 'El nombre es requerido';
                isValid = false;
            }
            if (!firstSurname) {
                newErrors[formType] = 'El primer apellido es requerido';
                isValid = false;
            }
        }

        if (!password) {
            newErrors[formType] = 'La contraseña es requerida';
            isValid = false;
        } else if (password.length < 8) {
            newErrors[formType] = 'La contraseña debe tener al menos 8 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (formType) => {
        if (!validateForm(formType)) return;

        try {
            if (formType === 'login') {
                const success = await login(
                    formData.login.email,
                    formData.login.password
                );

                if (success) {
                    setSuccess('¡Bienvenido de nuevo a WinMe!');
                    // Redirección manejada por el hook o por el componente que usa WinMeAuth
                }
            } else {
                const success = await register(
                    formData.register.name,
                    formData.register.firstSurname,
                    formData.register.secondSurname,
                    formData.register.email,
                    formData.register.password
                );

                if (success) {
                    setSuccess('¡Cuenta creada con éxito!');
                    // Redirección manejada por el hook o por el componente que usa WinMeAuth
                }
            }
        } catch (err) {
            // El error ya está manejado por el hook useAuth
            setErrors(prev => ({
                ...prev,
                [formType]: error || 'Error en el servidor. Inténtalo de nuevo.'
            }));
        }
    };

    return (
        <AuthLayout>
            <AnimatePresence mode="wait">
                {activeForm === 'login' ? (
                    <LoginForm
                        formData={formData.login}
                        errors={errors.login}
                        success={activeForm === 'login' ? success : ''}
                        loading={loading}
                        rememberMe={rememberMe}
                        onInputChange={(field, value) => handleInputChange('login', field, value)}
                        onRememberMeChange={(e) => setRememberMe(e.target.checked)}
                        onSubmit={(e) => { e.preventDefault(); handleSubmit('login'); }}
                        onSwitchForm={() => switchForm('register')}
                    />
                ) : (
                    <RegisterForm
                        formData={formData.register}
                        errors={errors.register}
                        success={activeForm === 'register' ? success : ''}
                        loading={loading}
                        acceptedTerms={acceptedTerms}
                        onInputChange={(field, value) => handleInputChange('register', field, value)}
                        onAcceptedTermsChange={(e) => setAcceptedTerms(e.target.checked)}
                        onSubmit={(e) => { e.preventDefault(); handleSubmit('register'); }}
                        onSwitchForm={() => switchForm('login')}
                    />
                )}
            </AnimatePresence>
        </AuthLayout>
    );
};

export default WinMeAuth;