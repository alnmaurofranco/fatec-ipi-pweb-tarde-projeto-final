import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import imgSenha from '../../assets/img/senha_esquecida.svg';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    async function handleForgotPassword(e) {
        e.preventDefault();

        try {
            const res = await api.post('/auth/forgot-password', { email });
            swal({
                icon: 'success',
                title: res.data.message,
                text: 'Acabamos de enviar um e-mail para você, para dar continuidade a recuperação de senha verifique sua caixa de mensagem ou spam e clique no link.',
                buttons: true
            });
        } catch (error) {
            if (error.response) {
                swal("Ocorreu um erro!", error.response.data.message, "error");
            }
        }
    }

    return (
        <>
            <Header />
            <main role="main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <img src={imgSenha} alt="xd" className="img__senha" />
                        </div>
                        <div className="col-lg-10">
                            <div className="card content__login">
                                <div className="card-body">
                                    <div className="title__login">
                                        <h2><i className="fas fa-user-circle"></i>
                                            Trocar a senha
                                        </h2>
                                        <p>Identifique-se para receber um e-mail com as instruções e o link para criar uma nova
                                    senha.</p>
                                    </div>
                                    <form onSubmit={handleForgotPassword}>
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail</label>
                                            <input
                                                type="email"
                                                className="form__login"
                                                placeholder="Digite seu e-mail..."
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                        </div>
                                        <button
                                            className="btn-lg btn-block btn-round"
                                            type="submit">
                                            Enviar senha
                                        </button>
                                    </form>
                                    <Link to="/login" className="btn-lg btn-round-primary btn-block">Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ForgotPassword;