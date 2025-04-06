import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Kullanıcı verilerini formda doldur
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateUser({
                ...formData,
                // Email ve role dokunmuyoruz
                email: user.email,
                role: user.role
            });
            setSuccess('Profil başarıyla güncellendi!');
        } catch (err) {
            setError(err.message || 'Profil güncelleme başarısız');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Card style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Profil Bilgileri</Card.Title>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Adresi</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        plaintext
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kullanıcı Tipi</Form.Label>
                                    <Form.Control
                                        value={user.role === 'sanatci' ? 'Sanatçı' :
                                            user.role === 'sanatevi' ? 'Sanat Evi' :
                                                user.role === 'koleksiyoner' ? 'Koleksiyoner' : 'Admin'}
                                        readOnly
                                        plaintext
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Ad Soyad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Biyografi</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Güncelleniyor...' : 'Profili Güncelle'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;