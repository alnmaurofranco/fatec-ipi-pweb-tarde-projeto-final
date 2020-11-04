import React from "react";

import './styles.css';

import imgLoading from '../../assets/img/load-1.svg';

export default function Loading() {
    return (
        <div className="page-loading">
            <div className="space">
                <h1>Carregando os dados</h1>
            </div>
            <img src={imgLoading} alt="loading.." />
        </div>
    );
}