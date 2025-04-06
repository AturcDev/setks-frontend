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

    // AuthContext.js'deki login fonksiyonu
    const login = async (userData) => {
        const response = await authService.login(userData);
        if (response.token) {
            const user = {
                token: response.token,
                name: response.name,    // Kullanıcı adı
                email: response.email,  // Kullanıcı emaili
                role: response.role     // Kullanıcı rolü
            };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }
        return response;
    };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

    // AuthContext'e updateUser fonksiyonu ekleyin
    const updateUser = async (updatedData) => {
        try {
            const response = await authService.updateProfile(updatedData);
            if (response.success) {
                const updatedUser = {
                    ...user,
                    ...updatedData
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            return response;
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    };
    // AuthContext.js'ye admin kontrolü ekleyin
    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    // Provider value'suna ekleyin
    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);