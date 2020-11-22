import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import imgOrderSuccess from '../../assets/img/order_confirmed.svg';

import './styles.css'
import { Link } from 'react-router-dom';

export const OrderSuccess = () => {
    return (
        <>
            <Header />
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={imgOrderSuccess}
                                alt="xx"
                                className="img__order"
                            />
                        </div>
                        <div className="col-md-6 page-order-success">
                            <h1>Compra realizada com sucesso!</h1>
                            <p>Seu pedido foi confirmado, ele está sendo preparado para enviar ao seu endereço.</p>
                            <Link to="/order-notafiscal" className="button-order-success mb-3">Imprimir Nota Fiscal</Link>
                            <p>OU</p>
                            <Link to="/" className="button-order">Voltar a loja</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}