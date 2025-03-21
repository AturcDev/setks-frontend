import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar bileşenini ekleyin
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events'; // Events sayfasını ekleyin
import Profile from './pages/Profile';
import MyWorks from './pages/MyWorks'; // MyWorks sayfasını ekleyin
import Admin from './pages/Admin'; // Admin sayfasını ekleyin
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar /> {/* Navbar bileşenini burada kullanın */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<Events />} /> {/* Events sayfası route'u */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-works" element={<MyWorks />} /> {/* MyWorks sayfası route'u */}
                    <Route path="/admin" element={<Admin />} /> {/* Admin sayfası route'u */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;