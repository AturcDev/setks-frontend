import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [artworks, setArtworks] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (user?.role !== 'Admin') {
            navigate('/'); // Admin değilse ana sayfaya yönlendir
        } else {
            fetchData();
        }
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const usersResponse = await axios.get('/api/users');
            const artworksResponse = await axios.get('/api/artworks');
            const auctionsResponse = await axios.get('/api/auctions');
            const invoicesResponse = await axios.get('/api/invoices');

            setUsers(usersResponse.data);
            setArtworks(artworksResponse.data);
            setAuctions(auctionsResponse.data);
            setInvoices(invoicesResponse.data);
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const handleEditUser = (userId) => {
        // Kullanıcı düzenleme işlemi
        console.log('Düzenle:', userId);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            fetchData(); // Verileri yeniden çek
        } catch (error) {
            console.error('Kullanıcı silme hatası:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Paneli</h1>

            {/* Kullanıcılar Tablosu */}
            <h2>Kullanıcılar</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad</th>
                        <th>E-posta</th>
                        <th>Rol</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditUser(user.id)}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Sanat Eserleri Tablosu */}
            <h2>Sanat Eserleri</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Başlık</th>
                        <th>Sanatçı</th>
                        <th>Kategori</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {artworks.map((artwork) => (
                        <tr key={artwork.id}>
                            <td>{artwork.id}</td>
                            <td>{artwork.title}</td>
                            <td>{artwork.artist?.name}</td>
                            <td>{artwork.category}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditArtwork(artwork.id)}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteArtwork(artwork.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Müzayedeler Tablosu */}
            <h2>Müzayedeler</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad</th>
                        <th>Başlangıç Tarihi</th>
                        <th>Bitiş Tarihi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction) => (
                        <tr key={auction.id}>
                            <td>{auction.id}</td>
                            <td>{auction.name}</td>
                            <td>{new Date(auction.startDate).toLocaleDateString()}</td>
                            <td>{new Date(auction.endDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditAuction(auction.id)}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteAuction(auction.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Faturalar Tablosu */}
            <h2>Faturalar</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kullanıcı</th>
                        <th>Tutar</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.user?.name}</td>
                            <td>{invoice.amount} TL</td>
                            <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEditInvoice(invoice.id)}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteInvoice(invoice.id)}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;