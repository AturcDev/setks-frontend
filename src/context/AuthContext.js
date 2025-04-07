import React, { createContext, useState, useEffect, useContext } from 'react'; // useContext eklendi
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (storedUser && token) {
                try {
                    // Token geçerliliğini kontrol et
                    const response = await api.get('/api/auth/validate');
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.login(credentials);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await api.updateProfile(updatedData);
            const newUserData = { ...user, ...updatedData };
            setUser(newUserData);
            localStorage.setItem('user', JSON.stringify(newUserData));
            return response;
        } catch (err) {
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// useContext import edildiği için artık hata vermeyecek
export const useAuth = () => useContext(AuthContext);