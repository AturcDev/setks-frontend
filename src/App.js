import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTema } from './context/TemaContext'; // useTema hook'unu ekleyin
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Profile from './pages/Profile';
import MyWorks from './pages/MyWorks';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const { tema } = useTema(); // useTema hook'unu kullanın

  // Tema değiştiğinde CSS dosyasını dinamik olarak yükle
   useEffect(() => {
    // Önceki tema CSS dosyasını kaldır
    const prevTema = localStorage.getItem('tema');
    if (prevTema) {
      const prevLink = document.getElementById(`tema-${prevTema}`);
      if (prevLink) {
        prevLink.remove();
      }
    }

    // Yeni tema CSS dosyasını yükle
    const link = document.createElement('link');
    link.id = `tema-${tema}`;
    link.rel = 'stylesheet';
    link.href = `./styles/${tema}.css`;
    document.head.appendChild(link);

    // LocalStorage'a yeni temayı kaydet
    localStorage.setItem('tema', tema);
  }, [tema]);

  return (
    <div className={`app ${tema}`}>
      <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-works" element={<MyWorks />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Router>
      </AuthProvider>
    </div>
  );
};

export default App;