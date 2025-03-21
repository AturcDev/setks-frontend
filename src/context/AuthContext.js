import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    const login = async (userData) => {
        const response = await authService.login(userData);
        if (response.token) {
            localStorage.setItem('user', JSON.stringify(response));
            setUser(response);
        }
        return response;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);