import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TemaSecici from './TemaSecici';

const CustomNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar expand="lg" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ color: 'var(--text-color)' }}>Sanat Evi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" style={{ color: 'var(--text-color)' }}>Anasayfa</Nav.Link>
                        <Nav.Link as={Link} to="/Events" style={{ color: 'var(--text-color)' }}>Etkinlikler</Nav.Link>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login" style={{ color: 'var(--text-color)' }}>Giriş Yap</Nav.Link>
                                <Nav.Link as={Link} to="/Register" style={{ color: 'var(--text-color)' }}>Kayıt Ol</Nav.Link>
                            </>
                        )}
                        {user?.role === 'sanatci' && (
                            <Nav.Link as={Link} to="/MyWorks" style={{ color: 'var(--text-color)' }}>Eserlerim</Nav.Link>
                        )}
                        {user?.role === 'sanatevi' && (
                            <Nav.Link as={Link} to="/add-event" style={{ color: 'var(--text-color)' }}>Etkinlik Ekle</Nav.Link>
                        )}
                        {user?.role === 'koleksiyoner' && (
                            <Nav.Link as={Link} to="/MyCollection" style={{ color: 'var(--text-color)' }}>Koleksiyonum</Nav.Link>
                        )}
                        {user?.role === 'admin' && (
                            <Nav.Link as={Link} to="/admin" style={{ color: 'var(--text-color)' }}>Admin</Nav.Link>
                        )}
                    </Nav>

                    {/* SADECE GİRİŞ YAPMIŞ KULLANICILAR İÇİN */}
                    {user && (
                        <Nav>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-light"
                                    id="dropdown-basic"
                                    style={{
                                        color: 'var(--text-color)',
                                        borderColor: 'var(--primary)',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {/* Kullanıcı adını göster - eğer yoksa emailin ilk kısmını göster */}
                                    {user.name || user.email || 'Kullanıcı'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{
                                    backgroundColor: 'var(--bg-color)',
                                    border: '1px solid var(--primary)'
                                }}>
                                    <Dropdown.Item
                                        as={Link}
                                        to="/profil"
                                        style={{ color: 'var(--text-color)' }}
                                    >
                                        Profil
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={handleLogout}
                                        style={{ color: 'var(--text-color)' }}
                                    >
                                        Çıkış Yap
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
                <TemaSecici />
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;