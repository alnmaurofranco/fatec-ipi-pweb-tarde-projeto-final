import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles.css';

import imgOrderConfirmation from '../../assets/img/order_confirmation.svg';
import imgCheckoutLogin from '../../assets/img/acc.svg';
import imgCheckoutRegister from '../../assets/img/cadastro.svg';
import { Context } from '../../Context/AuthContext';

export const Checkout = () => {
    const { authenticated } = useContext(Context);
    const { cartItems } = useSelector(state => state.cart);
    const history = useHistory();

    const handleOrderFinalization = () => {
        history.push('/order-success');
    }

    return (
        <div>
            <Header />
            <main>
                {authenticated === false ? (
                    <>
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="page-checkout-container">
                                    <div className="col-md-5">
                                        <img src={imgCheckoutRegister} className="img__container" alt="" />
                                        <Link to="/register" className="btn btn-round">Cadastre-se</Link>
                                    </div>
                                    <div className="col-md-2 font-weight-bold d-flex justify-content-center">
                                        OU
                                    </div>
                                    <div className="col-md-5">
                                        <Link to="/login" className="btn btn-round">Login</Link>
                                        <img src={imgCheckoutLogin} className="img__container" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <div className="container-fluid page-checkout">
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <img src={imgOrderConfirmation} className="img__checkout" alt="" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="cart-totals">
                                            <h3>Resumo do pedido </h3>
                                            <form action="#">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Total de Itens</td>
                                                            <td className="free-shipping">{cartItems.reduce((a, c) => a + c.qty, 0)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Numero</td>
                                                            <td>{Math.floor(Math.random() * 200)}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Frete</td>
                                                            <td className="free-shipping">Gratis</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Subtotal</td>
                                                            <td className="subtotal"> {cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                                                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} ou <br />

                                                                <strong>{cartItems.reduce((a, c) => a + (c.price * c.qty / 2), 0)
                                                                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} á vista</strong>
                                                            </td>
                                                        </tr>

                                                        <tr className="total-row">
                                                            <td>Total a pagar</td>
                                                            <td className="price-total">{cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                                                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="btn-cart-totals">
                                                    <button onClick={handleOrderFinalization} className="checkout btn-round btn-lg btn-block">Finalizar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                <Footer />
            </main>
        </div>
    )
}

