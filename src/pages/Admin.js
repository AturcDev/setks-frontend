import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Admin = () => {
    const { user } = useAuth();
    const [data, setData] = useState({ users: [], artworks: [], collections: [] });
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, artworksRes, collectionsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/artworks'),
                    api.get('/collections')
                ]);
                setData({
                    users: usersRes.data,
                    artworks: artworksRes.data,
                    collections: collectionsRes.data
                });
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (entity, id, updatedData) => {
        try {
            await api.put(`/${entity}/${id}`, updatedData);
            setData(prev => ({
                ...prev,
                [entity]: prev[entity].map(item =>
                    item.id === id ? { ...item, ...updatedData } : item
                )
            }));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    if (!user || user.role !== 'admin') {
        return <Alert variant="danger">Yalnızca adminler erişebilir</Alert>;
    }

    return (
        <div className="container mt-4">
            <h2>Admin Paneli</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Tabs defaultActiveKey="users" className="mb-3">
                <Tab eventKey="users" title="Kullanıcılar">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <EditableField
                                            value={user.name}
                                            onSave={(value) => handleUpdate('users', user.id, { name: value })}
                                        />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <EditableField
                                            value={user.role}
                                            onSave={(value) => handleUpdate('users', user.id, { role: value })}
                                            options={['user', 'artist', 'collector', 'admin']}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant={selectedUser?.id === user.id ? 'primary' : 'outline-primary'}
                                            size="sm"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            Seç
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="artworks" title="Eserler">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Sanatçı</th>
                                <th>Yıl</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.artworks
                                .filter(artwork =>
                                    !selectedUser || artwork.artistId === selectedUser.id
                                )
                                .map(artwork => (
                                    <tr key={artwork.id}>
                                        <td>{artwork.id}</td>
                                        <td>
                                            <EditableField
                                                value={artwork.title}
                                                onSave={(value) => handleUpdate('artworks', artwork.id, { title: value })}
                                            />
                                        </td>
                                        <td>
                                            {data.users.find(u => u.id === artwork.artistId)?.name || 'Bilinmiyor'}
                                        </td>
                                        <td>
                                            <EditableField
                                                value={artwork.year}
                                                onSave={(value) => handleUpdate('artworks', artwork.id, { year: value })}
                                            />
                                        </td>
                                        <td>
                                            <EditableField
                                                value={artwork.price}
                                                onSave={(value) => handleUpdate('artworks', artwork.id, { price: value })}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="collections" title="Koleksiyonlar">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ad</th>
                                <th>Koleksiyoner</th>
                                <th>Eser Sayısı</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.collections.map(collection => (
                                <tr key={collection.id}>
                                    <td>{collection.id}</td>
                                    <td>
                                        <EditableField
                                            value={collection.name}
                                            onSave={(value) => handleUpdate('collections', collection.id, { name: value })}
                                        />
                                    </td>
                                    <td>
                                        {data.users.find(u => u.id === collection.collectorId)?.name || 'Bilinmiyor'}
                                    </td>
                                    <td>
                                        {data.artworks.filter(a => a.collectionId === collection.id).length}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
};

// EditableField bileşeni
const EditableField = ({ value, onSave, options }) => {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onSave(tempValue);
        setEditing(false);
    };

    return editing ? (
        <div className="d-flex align-items-center">
            {options ? (
                <select
                    className="form-select form-select-sm"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                >
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                />
            )}
            <Button variant="success" size="sm" onClick={handleSave} className="ms-2">
                ✓
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setEditing(false)} className="ms-1">
                ✕
            </Button>
        </div>
    ) : (
        <div onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
            {value}
        </div>
    );
};

export default Admin;