import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSayfasi = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('kullanicilar');
    const [veriler, setVeriler] = useState({
        kullanicilar: [],
        eserler: [],
        koleksiyonlar: [],
        etkinlikler: []
    });
    const [seciliKullanici, setSeciliKullanici] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Kullanıcı admin değilse yönlendir
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    // Verileri çek
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all([
                    fetch('/api/kullanicilar'),
                    fetch('/api/eserler'),
                ]);

                const data = await Promise.all(responses.map(res => res.json()));

                setVeriler({
                    kullanicilar: data[0],
                    eserler: data[1],
                    koleksiyonlar: data[2],
                    etkinlikler: data[3]
                });
            } catch (err) {
                setError('Veri çekme hatası: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Seçili kullanıcıya göre filtreleme
    const filtreliEserler = seciliKullanici
        ? veriler.eserler.filter(eser => eser.kullaniciId === seciliKullanici.id)
        : veriler.eserler;

    const handleUpdate = async (tablo, id, guncelVeri) => {
        try {
            const response = await fetch(`/api/${tablo}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guncelVeri)
            });

            if (!response.ok) throw new Error('Güncelleme başarısız');

            // Yerel state'i güncelle
            setVeriler(prev => ({
                ...prev,
                [tablo]: prev[tablo].map(item =>
                    item.id === id ? { ...item, ...guncelVeri } : item
                )
            }));
        } catch (err) {
            setError('Güncelleme hatası: ' + err.message);
        }
    };

    if (loading) return <div className="text-center mt-5">Yükleniyor...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container-fluid mt-3">
            <h2 className="mb-4">Admin Paneli</h2>

            <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)} className="mb-3">
                <Tab eventKey="kullanicilar" title="Kullanıcılar">
                    <KullaniciTablosu
                        data={veriler.kullanicilar}
                        onSelect={setSeciliKullanici}
                        onUpdate={handleUpdate}
                    />
                </Tab>
                <Tab eventKey="eserler" title="Eserler">
                    <EserTablosu
                        data={filtreliEserler}
                        onUpdate={handleUpdate}
                    />
                </Tab>
            </Tabs>
        </div>
    );
};

// Yardımcı Tablo Bileşenleri
const EditableCell = ({ value, onUpdate, field, id, tablo }) => {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onUpdate(tablo, id, { [field]: tempValue });
        setEditing(false);
    };

    return editing ? (
        <div className="d-flex">
            <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="form-control form-control-sm"
            />
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

const KullaniciTablosu = ({ data, onSelect, onUpdate }) => (
    <Table striped bordered hover responsive>
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
            {data.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                        <EditableCell
                            value={user.name}
                            onUpdate={onUpdate}
                            field="name"
                            id={user.id}
                            tablo="kullanicilar"
                        />
                    </td>
                    <td>{user.email}</td>
                    <td>
                        <EditableCell
                            value={user.role}
                            onUpdate={onUpdate}
                            field="role"
                            id={user.id}
                            tablo="kullanicilar"
                        />
                    </td>
                    <td>
                        <Button variant="info" size="sm" onClick={() => onSelect(user)}>
                            Seç
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

// Diğer tablo bileşenleri benzer şekilde oluşturulabilir
const EserTablosu = ({ data, onUpdate }) => (
    <Table striped bordered hover responsive>
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
            {data.map(eser => (
                <tr key={eser.id}>
                    <td>{eser.id}</td>
                    <td>
                        <EditableCell
                            value={eser.ad}
                            onUpdate={onUpdate}
                            field="ad"
                            id={eser.id}
                            tablo="eserler"
                        />
                    </td>
                    <td>{eser.sanatciAdi}</td>
                    <td>
                        <EditableCell
                            value={eser.yil}
                            onUpdate={onUpdate}
                            field="yil"
                            id={eser.id}
                            tablo="eserler"
                        />
                    </td>
                    <td>
                        <EditableCell
                            value={eser.fiyat}
                            onUpdate={onUpdate}
                            field="fiyat"
                            id={eser.id}
                            tablo="eserler"
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

// KoleksiyonTablosu ve EtkinlikTablosu bileşenleri benzer şekilde oluşturulabilir

export default AdminSayfasi;