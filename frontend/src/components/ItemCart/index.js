import React from 'react';
import { Link } from 'react-router-dom';

function ItemCart(props) {
    return (
        <div className="cart-table-item">
            <div className="cart-product-container">
                <div className="cart-product--item">
                    <Link className="cart-product--item-image" to={`/product/${props.produto}`}>
                        <img src={props.imagem} alt={props.title} />
                    </Link>
                    <div className="cart-product--item-info">
                        <Link className="cart-product--item-info-title" to={`/product/${props.produto}`}>
                            <p>{props.title}</p>
                            <p className="cart-product--item-info-txt">
                                Código do produto: {props.codigo}
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="cart-product--qtd">
                    <span className="cart-product--qtd-title">Quantidade:</span>
                    {props.qty}
                    <button className="cart-product--qtd-remove" onClick={props.removeItemCart}>
                        <svg className="cart-product--qtd-delete-icon" width="14" height="18"
                            viewBox="0 0 14 18">
                            <path
                                d="M12.999 4.001h-12v12a2 2 0 002.001 2h7.999a2 2 0 002-2v-12M9.499 0h-5L3.5 1.001H.999A1 1 0 000 2v1.001h14V2a1 1 0 00-1.001-.999H10.5L9.499 0"
                                fill="#9B9B9B" fillRule="evenodd"></path>
                        </svg>
                        <span className="cart-product--qtd-delete-span">Excluir</span>
                    </button>
                </div>
                <div className="cart-product--price">
                    <span>{props.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemCart;