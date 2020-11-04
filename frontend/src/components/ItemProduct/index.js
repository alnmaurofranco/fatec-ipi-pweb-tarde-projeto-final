import React from "react";
import { Link } from "react-router-dom";

function ItemProduct(props) {
  return (
    <div className={props.col ? props.col : 'col-sm-6 col-lg-3'}>
      <div className="single-publication">
        <figure>
          <Link to={`/product/${props.url}`}>
            <img src={props.img} alt={props.title} />
          </Link>
        </figure>

        <div className="publication-content">
          <span className="category">{props.categorys}</span>
          <h3>
            <Link to={`/product/${props.url}`}>{props.name}</Link>
          </h3>

          <h4 className="price">
            <Link to={`/product/${props.url}`}>
              {props.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
