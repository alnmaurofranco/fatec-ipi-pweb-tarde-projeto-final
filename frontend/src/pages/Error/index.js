import React from "react";
import { Link } from "react-router-dom";

import './styles.css';
import imgError from '../../assets/img/404.svg';

function Error() {
  return (
    <div className="page-error">
      <img className="img404" src={imgError} alt="xd" />
      <div className="title">
        <h1><span role="img" aria-label="close">❌</span> Pagina não foi encontrada!</h1>
        <p>Não foi possivel acessar essa pagina talvez essa pagina não exista mais.</p>
        <Link className="btn-round" to="/">Pagina Inicial</Link>
      </div>
    </div>
  );
}

export default Error;
