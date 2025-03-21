import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth(); // AuthContext'ten kullanıcı bilgilerini al

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Profil Bilgileri</h2>
                            <div className="mb-3">
                                <label className="form-label">Ad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user?.name || ''}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-posta</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={user?.email || ''}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telefon Numarası</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user?.mobileNo || ''}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rol</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user?.role || ''}
                                    readOnly
                                />
                            </div>
                            <div className="alert alert-info">
                                Bilgilerinizi değiştirmek için <a href="mailto:destek@aturc.com">destek@aturc.com</a> adresine mail atınız.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;