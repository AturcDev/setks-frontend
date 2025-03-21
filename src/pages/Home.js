import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">SET-KS Ana Sayfa</h1>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Sanat Eseri 1" />
                            <div className="card-body">
                                <h5 className="card-title">Sanat Eseri 1</h5>
                                <p className="card-text">Bu eser, modern sanatın en güzel örneklerinden biridir.</p>
                                <a href="#" className="btn btn-primary">Detaylar</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Sanat Eseri 2" />
                            <div className="card-body">
                                <h5 className="card-title">Sanat Eseri 2</h5>
                                <p className="card-text">Bu eser, klasik sanatın nadide örneklerindendir.</p>
                                <a href="#" className="btn btn-primary">Detaylar</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Sanat Eseri 3" />
                            <div className="card-body">
                                <h5 className="card-title">Sanat Eseri 3</h5>
                                <p className="card-text">Bu eser, çağdaş sanatın en çarpıcı örneklerinden biridir.</p>
                                <a href="#" className="btn btn-primary">Detaylar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;