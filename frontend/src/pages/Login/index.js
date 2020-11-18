import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import loginImg from "../../assets/img/acc.svg";
import { Link } from "react-router-dom";

//Context
//import { Context } from '../../Context/AuthContext';
import { useDispatch } from 'react-redux';
import { LoginUser } from "../../store/User/User.actions";

function Login() {
  //const { handleLogin } = useContext(Context);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser(email, password));
  }

  return (
    <div>
      <Header />
      <main className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <img src={loginImg} alt="op" className="img__login" />
            </div>
            <div className="col-lg-10">
              <div className="card content__login">
                <div className="card-body">
                  <div className="title__login">
                    <h2>
                      <FaUserCircle /> Login do Cliente
                    </h2>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input
                        type="email"
                        className="form__login"
                        placeholder="Digite seu e-mail..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="senha">Senha</label>
                      <input
                        type="password"
                        className="form__login"
                        placeholder="Digite sua senha..."
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input type="checkbox" /> Mantenha-me conectado
                      <Link to="/forgotpassword" className="text__login">
                        Esqueceu a senha?
                      </Link>
                    </div>

                    <button
                      className="btn-lg btn-block btn-round"
                      type="submit"
                    // onClick={() => { handleLogin(email, password) }}
                    >
                      Entrar
                    </button>
                  </form>
                  <Link to="/register" className="btn-lg btn-round-primary btn-block">
                    Cadastre-se
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

export default Login;
