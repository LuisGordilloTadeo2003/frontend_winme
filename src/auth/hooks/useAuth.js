// src/hooks/useAuth.js
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de tener axios instalado

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //const navigate = useNavigate();

    // Función para login
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //navigate('/dashboard'); // Redirige al dashboard después del login
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Función para registro
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //navigate('/dashboard'); // Redirige al dashboard después del registro
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Función para logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //navigate('/login');
    };

    return {
        login,
        register,
        logout,
        loading,
        error,
        isAuthenticated: !!localStorage.getItem('token')
    };
};