import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [userType, setUserType] = useState('Koleksiyoner'); // Kullanıcı türü
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [biography, setBiography] = useState(''); // Sanatçı için biyografi
    const [taxNumber, setTaxNumber] = useState(''); // Sanat Evi için vergi numarası
    const [companyName, setCompanyName] = useState(''); // Sanat Evi için firma adı
    const [companyAddress, setCompanyAddress] = useState(''); // Sanat Evi için adres
    const [city, setCity] = useState(''); // Sanat Evi için şehir
    const [district, setDistrict] = useState(''); // Sanat Evi için ilçe
    const [country, setCountry] = useState(''); // Sanat Evi için ülke
    const [taxOffice, setTaxOffice] = useState(''); // Sanat Evi için vergi dairesi

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                userType,
                name,
                email,
                mobileNo,
                password,
                biography,
                taxNumber,
                companyName,
                companyAddress,
                city,
                district,
                country,
                taxOffice,
            };
            await register(userData);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Kayıt Ol</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Kullanıcı Türü</label>
                                    <select
                                        className="form-select"
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                    >
                                        <option value="Koleksiyoner">Koleksiyoner</option>
                                        <option value="Sanatçı">Sanatçı</option>
                                        <option value="Sanat Evi">Sanat Evi</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ad</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">E-posta</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefon Numarası</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mobileNo}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Şifre</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Sanatçı için biyografi alanı */}
                                {userType === 'Sanatçı' && (
                                    <div className="mb-3">
                                        <label className="form-label">Biyografi</label>
                                        <textarea
                                            className="form-control"
                                            value={biography}
                                            onChange={(e) => setBiography(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Sanat Evi için firma bilgileri */}
                                {userType === 'Sanat Evi' && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Vergi Numarası</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={taxNumber}
                                                onChange={(e) => setTaxNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Firma Adı</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Adres</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={companyAddress}
                                                onChange={(e) => setCompanyAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Şehir</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">İlçe</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={district}
                                                onChange={(e) => setDistrict(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Ülke</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Vergi Dairesi</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={taxOffice}
                                                onChange={(e) => setTaxOffice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <button type="submit" className="btn btn-primary w-100">Kayıt Ol</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;