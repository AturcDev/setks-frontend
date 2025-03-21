import axios from 'axios';

const API_URL = 'http://localhost:5267/api'; // Backend API URL'si

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/Users/Register`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/Users/Login`, userData);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;