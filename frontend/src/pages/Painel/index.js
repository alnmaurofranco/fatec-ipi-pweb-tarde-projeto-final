import React, { useContext, useEffect, useState } from 'react';
import { FaPowerOff, FaCog } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Context } from '../../Context/AuthContext';
import api from '../../services/api';

import imgProfile from '../../assets/img/profile.svg';

function Painel() {
    const { handleLogout } = useContext(Context);
    const [users, setUsers] = useState({});

    useEffect(() => {
        (async () => {
            const response = await api.get('/account');
            console.log(response.data.user);
            setUsers(response.data.user);
        })();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <img src={imgProfile} className="img__senha" alt="x" />
                        </div>
                        <div className="col-lg-10 mt-5">
                            <div className="card content__login">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <img src={users.avatar} alt="x" className="avatar__profile" />
                                    </div>
                                    <p className="title__profile mb-4">
                                        Olá, {users.first_name}. Bem-vindo ao seu Painel!
                                    </p>
                                    <button className="btn-profile float-left" onClick={() => { }}><FaCog size="1.2rem" className="icon__profile" /> Meus Dados</button>
                                    <button className="btn-profile float-right" onClick={handleLogout}><FaPowerOff size="1.2rem" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Painel;