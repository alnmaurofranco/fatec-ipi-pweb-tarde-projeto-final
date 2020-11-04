import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import imgSenha from '../../assets/img/senha.svg';

function ResetPassword() {
    const params = useParams();
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    console.log(params);

    async function handleResetPassword(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            swal({
                icon: 'warning',
                title: 'Confirme sua senha',
                text: 'As senhas não são iguais tente novamente.',
                buttons: true
            })
        }

        try {
            await api.put(`/auth/resetpassword/${params.token}`, { password });

            swal({
                icon: 'success',
                title: 'Senha alterada com sucesso!',
                text: 'Sua senha foi alterada, faça login com sua nova senha da proxima vez.',
                timer: 2300
            });

            history.push('/login');
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
                                            Recuperação da senha
                                        </h2>
                                        <p className="text-center">Abaixo escolha uma nova senha para sua conta.</p>
                                    </div>
                                    <form onSubmit={handleResetPassword}>
                                        <div className="form-group">
                                            <label htmlFor="password">Nova Senha</label>
                                            <input
                                                type="password"
                                                className="form__login"
                                                placeholder="Digite sua nova senha..."
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Repita Nova Senha</label>
                                            <input
                                                type="password"
                                                className="form__login"
                                                placeholder="Repita novamente sua nova senha..."
                                                value={passwordConfirm}
                                                onChange={(e) => setpasswordConfirm(e.target.value)}
                                                required />
                                        </div>
                                        <button
                                            className="btn-lg btn-block btn-round"
                                            type="submit">
                                            Finalizar
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

export default ResetPassword;