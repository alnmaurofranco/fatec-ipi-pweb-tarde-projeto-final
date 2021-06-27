import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTv, FaLaptop, FaMobileAlt, FaBook } from "react-icons/fa";
import swal from "sweetalert";
import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import ItemProduct from "../../components/ItemProduct";
import ItemCategories from "../../components/ItemCategories";
import Loading from "../../components/Loading";
import DataError from "../Error/DataError";

import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from "../../store/Products/Products.actions";

function Home() {
  const dispatch = useDispatch();
  const { loading, dataError, products } = useSelector(state => state.products)
  const [newsletter, setNewsletter] = useState('');

  useEffect(() => {
    dispatch(GetProducts());

  }, [dispatch]);

  async function handleNewsletter(e) {
    e.preventDefault();

    try {
      const response = await api.post('/news', { email: newsletter });
      swal({
        icon: 'success',
        title: 'E-mail cadastrado no Newsletter',
        text: response.data.message,
        buttons: true
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        swal("Ocorreu um erro!", error.response.data.message, "error");
      }
    }
  }

  return (
    <div>
      {loading ? <Loading /> : dataError === true ? <DataError /> : (
        <div>
          <Header />
          <main role="main">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="title__section">Ofertas em alta</div>
                </div>
                {products.map(
                  ({ id, title, price, slug, image_url, categorys }) => (
                    <ItemProduct
                      key={id}
                      name={title}
                      price={price}
                      img={image_url}
                      url={slug}
                      categorys={categorys.map(({ name }) => name)}
                    />
                  )
                )}
              </div>

              <div className="row" id="departamentos">
                <div className="col-12">
                  <div className="title__section" id="departamentos">Departamentos</div>
                </div>
                <ItemCategories title="TV" url="/departamentos/tv">
                  <FaTv className="card__icon" size="5em" />
                </ItemCategories>

                <ItemCategories title="Notebook" url="/departamentos/notebook">
                  <FaLaptop className="card__icon" size="5em" />
                </ItemCategories>

                <ItemCategories title="Celular" url="/departamentos/celular">
                  <FaMobileAlt className="card__icon" size="5em" />
                </ItemCategories>

                <ItemCategories title="Livro" url="/departamentos/livro">
                  <FaBook className="card__icon" size="5em" />
                </ItemCategories>
              </div>

              <div className="row" id="alta">
                <div className="title__section mx-auto" id="maisvendidos">Mais vendidos</div>
                <div className="col-md-12">
                  <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">

                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="row">
                          {products.slice(2, 6).map((product) => (
                            <div className="col-sm-3 mb-5" key={product.id}>
                              <div className="thumb-wrapper">
                                <div className="img-box">
                                  <img src={product.image_url} className="img-fluid" alt="" />
                                </div>
                                <div className="thumb-content">
                                  <h4>{product.title}</h4>
                                  <p className="item-price"><span>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                  <Link to={`/product/${product.slug}`} className="btn btn-primary">Mais detalhes</Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* <Link className="carousel-control-prev" onClick={handlePrev} data-slide="prev">
                      <FaAngleLeft color="#111" />
                    </Link>
                    <Link className="carousel-control-next" onClick={handleNext} data-slide="next">
                      <FaAngleRight color="#111" />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row custom-row">
                <div className="title__contact mx-auto" id="quemsomos">
                  Faça seu cadastro para receber ofertas
                </div>
                <form className="form-inline mx-auto mb-9" onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    className="form-contact-control form-control-lg form-contact"
                    placeholder="Digite seu email para receber novas ofertas"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-lg ml-3 btn-news hvr-glow">Cadastrar</button>
                </form>
              </div>
            </div>

            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
