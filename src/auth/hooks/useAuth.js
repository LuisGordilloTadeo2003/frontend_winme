// src/hooks/useAuth.js
import { useState } from 'react';
import apiClient from '../../config/axiosConfig';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post(`/api/auth/login`, {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, firstSurname, secondSurname, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post(`/api/auth/register`, {
                name,
                firstSurname,
                secondSurname,
                email,
                password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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