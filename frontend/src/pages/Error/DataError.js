import React from "react";
import { Link } from "react-router-dom";

import './styles.css';
import imgDataError from '../../assets/img/404.svg';

function DataError() {
    return (
        <div className="page-error">
            <img className="img404" src={imgDataError} alt="xd" />
            <div className="title">
                <h1><span role="img" aria-label="close">❌</span> Problemas de conexao</h1>
                <p>Não foi possivel acessar essa pagina talvez essa pagina não exista mais.</p>
                <Link className="btn-round" to="/">Pagina Inicial</Link>
            </div>
        </div>
    );
}

export default DataError;
