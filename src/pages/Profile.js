import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phone: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            alert('Profil güncellendi!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={user?.email} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ad Soyad</Form.Label>
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Güncelle
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;