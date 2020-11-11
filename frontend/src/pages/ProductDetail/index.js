import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemProductDetail from '../../components/ItemProductDetail'

import { Link, useParams } from "react-router-dom";
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from "../../store/Product/Product.actions";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.product)
  const [cat, setCat] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const result = await api.get(`/product/${params.slug}`);
        setCat(result.data.data.categorys);
      } catch (e) {
        if (e.response) {
          swal("Ocorreu um erro!", e.response.data.message, "error");
        }
      }
    })();
    dispatch(detailsProduct(params.slug))
  }, [dispatch, params.slug]);

  // const handleAddCart = () => {
  //   history.push(`/cart/${product.id}?qty=${qty}`)
  // }

  return (
    <div>
      <Header />
      <main role="main">
        <div className="container">
          <div className="title__section">
            <h2>Detalhe do Produto</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="product-slider">
                <img
                  className="imagem-produto"
                  src={product.image_url}
                  alt={product.title}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">
                    {product.title}
                  </div>
                  <div className="product-price-discount">
                    <span>{Number(product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
                <p>
                  {String(product.description).substr(0, 330)}
                </p>
                <div className="product-count">
                  <label htmlFor="size">Quantidade</label><br />
                  {product.unit > 0 ? (
                    <span className="text-success"><strong>Disponivel em estoque</strong></span>
                  )
                    :
                    (
                      <span className="text-danger"><strong>No momento está indisponivel em estoque</strong></span>
                    )}
                  {product.unit > 0 && (
                    <>
                      <form action="" className="mt-2">
                        <select value={qty} onChange={e => setQty(e.target.value)}>
                          {
                            [...Array(product.unit).keys()].map(x => (
                              <option value={x + 1} key={x + 1}>
                                { x + 1}
                              </option>
                            ))
                          }
                        </select>
                      </form>
                    </>
                  )}

                  <Link to={`/cart/${product.id}?qty=${qty}`} className="btn-round">
                    Adicionar ao carrinho
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="product-info-tabs">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="description-tab"
                  data-toggle="tab"
                  href="#caracteristica"
                  role="tab"
                  aria-controls="caracteristica"
                  aria-selected="true"
                >
                  Características
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <div className="row">
                  <div className="col-md-12">
                    {product.details}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="title__section">Quem viu este produto também comprou</div>
            </div>
            <ItemProductDetail category={cat.map(category => category.name)} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default ProductDetail;
