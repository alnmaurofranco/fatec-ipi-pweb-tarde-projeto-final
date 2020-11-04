import React, { useEffect, useState } from "react";
import api from "../../services/api";
import swal from "sweetalert";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link, useHistory, useParams } from "react-router-dom";
import './styles.css';
import ItemProductDetail from "../../components/ItemProductDetail";

function ProductDetail() {
  const params = useParams();
  const history = useHistory();
  const [cat, setCat] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const result = await api.get(`/product/${params.slug}`);
        setProduct(result.data.data);
        setCat(result.data.data.categorys);
      } catch (e) {
        if (e.response) {
          swal("Ocorreu um erro!", e.response.data.message, "error");
          // eslint-disable-next-line
          history.push('/');
        }
      }
    })();


  }, [params.slug]);

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
                <img className="imagem-produto" src={product.image_url} alt={product.title} />
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
                  <label htmlFor="size">Quantidade</label>
                  <form action="#">
                    <select name="" id="">
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">{product.unit}</option>
                    </select>
                  </form>
                  <Link to={`/cart/${product.id}`} className="btn-round">
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
