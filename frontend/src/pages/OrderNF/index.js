import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';


export const OrderNF = () => {
    const [users, setUsers] = useState({});
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        (async () => {
            const response = await api.get('/account');
            setUsers(response.data.user);
        })();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-order-nf">
                            <h1 className="text-center"><span role="img" aria-label="nota">🧾</span> NOTA FISCAL</h1>
                            <h1 className="text-center">MARKET INFO</h1>
                            <h1 className="text-center">N: {Math.floor(Math.random() * 20000000000)}</h1>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="order-nf">
                            <h5><strong>Nome do Cliente:</strong> {`${users.first_name} ${users.last_name}`}</h5>
                            <h5><strong>CPF:</strong> {Number(users.cpf) === 0 ? '1121022458-52' : users.cpf}</h5>
                            <h5><strong>Endereço:</strong> Avenida das nações unidas <strong>Numero:</strong> 14401</h5>
                            <h5><strong>CEP:</strong> 03132321</h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="order-nf">
                            <h5><strong>Nome da Empresa:</strong> MarketInfo LTDA</h5>
                            <h5><strong>CPF:</strong> 4001022458-22</h5>
                            <h5><strong>Endereço:</strong> Avenida Paulista<strong> Numero:</strong> 2073</h5>
                            <h5><strong>CEP:</strong> 01311-300</h5>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="order-nf">
                            <h5><strong>Produtos</strong></h5>
                            <ul>
                                {cartItems.map(x => (
                                    <li key={x.id}>
                                        <strong>{x.title} <span className="text-primary">{x.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="float-right text-danger font-weight-bold mb-5">
                            VALOR TOTAL DA NOTA: {cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </h5>
                        <Link to="/dashboard" className="btn btn-primary btn-block float-right">OK</Link>
                    </div>
                </div>
            </div>
        </>
    )
}