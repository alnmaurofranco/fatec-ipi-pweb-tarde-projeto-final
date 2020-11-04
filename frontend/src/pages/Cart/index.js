import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Cart() {
    return (
        <>
            <Header />
            <main>
                <section className="jumbotron text-center mt-6">
                    <div className="container">
                        <h1 className="jumbotron-heading">
                            <FaShoppingCart className="mr-2" size="3rem" />CARRINHO
                        </h1>
                    </div>
                </section>
                <div className="container-fluid">
                    <div className="row mb-5">
                        <div className="col-md-9">
                            <div className="cart-table">
                                <div className="cart-table-header">
                                    <div className="cart-table-header--qtd">Qtd</div>
                                    <div className="cart-table-header--price">Preço</div>
                                </div>
                                <div className="cart-table-item">
                                    <div className="cart-product-container">
                                        <div className="cart-product--item">
                                            <Link className="cart-product--item-image" to="#">
                                                <img src="http://localhost:8000/assets/img/livro.jpg" alt="x" /></Link>
                                            <div className="cart-product--item-info">
                                                <Link className="cart-product--item-info-title" to="/">
                                                    <p>Livro de Programação Web Com Node E Express - Novatec Editora</p>
                                                    <p className="cart-product--item-info-txt">
                                                        Código do produto: 00000001
                                            </p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="cart-product--qtd">
                                            <span className="cart-product--qtd-title">Quantidade:</span>
                                            <select className="cart-product--qtd-dropdown">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                            <button className="cart-product--qtd-remove">
                                                <svg className="cart-product--qtd-delete-icon" width="14" height="18"
                                                    viewBox="0 0 14 18">
                                                    <path
                                                        d="M12.999 4.001h-12v12a2 2 0 002.001 2h7.999a2 2 0 002-2v-12M9.499 0h-5L3.5 1.001H.999A1 1 0 000 2v1.001h14V2a1 1 0 00-1.001-.999H10.5L9.499 0"
                                                        fill="#9B9B9B" fill-rule="evenodd"></path>
                                                </svg>
                                                <span className="cart-product--qtd-delete-span">Excluir</span>
                                            </button>
                                        </div>
                                        <div className="cart-product--price">
                                            <span>R$ 100,00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="col-lg-3">
                            <div className="cart-totals">
                                <h3>Resumo do pedido</h3>
                                <form action="#">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td className="subtotal">R$ 5.799,00 ou <br /><strong>R$ 5.500,00 á vista</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Frete</td>
                                                <td className="free-shipping">Gratis</td>
                                            </tr>
                                            <tr className="total-row">
                                                <td>Total</td>
                                                <td className="price-total">R$ 5.799,00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="btn-cart-totals">
                                        <Link to="/" className="checkout btn-round btn-lg btn-block">Continuar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    );
}

export default Cart;