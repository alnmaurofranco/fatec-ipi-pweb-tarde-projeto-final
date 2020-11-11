import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ItemCart from '../../components/ItemCart';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/Cart/Cart.actions';

function Cart() {
    const { search } = useLocation();
    const params = useParams();
    const productId = params.id;
    const qty = search ? Number(search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }

    }, [dispatch, productId, qty]);

    const handleRemoveItemCart = (id) => {
        dispatch(removeFromCart(id));
    }

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
                    {cartItems.length === 0 ? (
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h1 className="text-center mb-5 mt-5 pt-5 pb-6">Carrinho está vazio</h1>
                            </div>
                        </div>
                    ) : (
                            <div className="row mb-5">
                                <div className="col-md-9">
                                    <div className="cart-table">
                                        <div className="cart-table-header">
                                            <div className="cart-table-header--qtd">Qtd</div>
                                            <div className="cart-table-header--price">Preço</div>
                                        </div>
                                        {cartItems.map(item => (
                                            <ItemCart
                                                key={item.product}
                                                produto={item.product}
                                                codigo={item.codigo}
                                                imagem={item.image_url}
                                                price={item.price}
                                                title={item.title}
                                                removeItemCart={() => { handleRemoveItemCart(item.product) }}
                                                qty={
                                                    <select
                                                        className="cart-product--qtd-dropdown"
                                                        value={item.qty}
                                                        onChange={e =>
                                                            dispatch(addToCart(item.product, Number(e.target.value)))
                                                        }
                                                    >
                                                        {[...Array(item.unit).keys()].map(x => (
                                                            <option value={x + 1} key={x + 1}>
                                                                { x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="cart-totals">
                                        <h3>Resumo do pedido</h3>
                                        <form action="#">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Itens</td>
                                                        <td className="free-shipping">{cartItems.reduce((a, c) => a + c.qty, 0)}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Subtotal</td>
                                                        <td className="subtotal"> {cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                                                            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} ou <br />

                                                            <strong>{cartItems.reduce((a, c) => a + (c.price * c.qty / 2), 0)
                                                                .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} á vista</strong>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Frete</td>
                                                        <td className="free-shipping">Gratis</td>
                                                    </tr>

                                                    <tr className="total-row">
                                                        <td>Total</td>
                                                        <td className="price-total">{cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                                                            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
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
                        )}
                </div>
                <Footer />
            </main>
        </>
    );
}

export default Cart;