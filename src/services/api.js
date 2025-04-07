import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5267',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export default {
    // Auth
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (data) => api.post('/api/auth/register', data),

    // User
    getUsers: () => api.get('/api/users'),
    updateUser: (id, data) => api.put(`/api/users/${id}`, data),

    // Artworks
    getArtworks: () => api.get('/api/artworks'),
    updateArtwork: (id, data) => api.put(`/api/artworks/${id}`, data),

    // Collections
    getCollections: () => api.get('/api/collections'),
    updateCollection: (id, data) => api.put(`/api/collections/${id}`, data)
};