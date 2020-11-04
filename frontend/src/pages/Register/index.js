import React, { useState } from "react";
import swal from 'sweetalert';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import imgCadastro from "../../assets/img/cadastro.svg";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleRegisterForm(e) {
    e.preventDefault();

    try {
      if (password !== passwordConfirm) {
        return false;
      }

      await api.post(
        `/auth/signup/`,
        {
          first_name,
          last_name,
          email,
          password,
          passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      swal({
        title: 'Cadastrado Concluido',
        text: 'Você foi cadastrado com sucesso!',
        icon: 'success',
        timer: 2000
      });
      history.push('/login');
    } catch (error) {
      if (error.response) {
        //console.log('first', error.response.data);
        swal("Ocorreu um erro!", error.response.data.message, "error");
        //console.log(error.response.status);
        //console.log(error.response.headers);
      }
    }
  }

  return (
    <div>
      <Header />
      <main className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <img src={imgCadastro} alt="" className="img__cadastro" />
            </div>
            <div className="col-lg-10 mb-5">
              <div className="card content__login">
                <div className="card-body">
                  <div className="title__login">
                    <h2>
                      <i className="fas fa-address-card"></i> Cadastre-se
                    </h2>
                  </div>
                  <form onSubmit={handleRegisterForm}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Nome</label>
                          <input
                            type="text"
                            className="form__login"
                            placeholder="Digite seu nome..."
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="senha">Sobrenome</label>
                          <input
                            type="text"
                            className="form__login"
                            placeholder="Digite seu sobrenome..."
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="senha">E-mail</label>
                          <input
                            type="email"
                            className="form__login"
                            placeholder="Digite seu e-mail..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="senha">Senha</label>
                          <input
                            type="password"
                            className="form__login"
                            placeholder="Digite sua senha..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="senha">Confirme sua senha</label>
                          <input
                            type="password"
                            className="form__login"
                            placeholder="Digite sua senha novamente para confirmar..."
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn-lg btn-block btn-round"
                      type="submit"
                    >
                      Cadastrar
                    </button>
                  </form>
                  <Link to="/login" className="btn-lg btn-round-primary btn-block">
                    Volta para login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Register;
