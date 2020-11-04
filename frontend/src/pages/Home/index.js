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


function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [dataError, setDataError] = useState(false);
  const [newsletter, setNewsletter] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/product/all");
        setTimeout(() => {
          setDataError(false);
          setProducts(response.data.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        if (error.config.data === undefined) {
          setLoading(false);
          setDataError(true);
        }
      }
    })();

  }, []);

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
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                    </ol>

                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-sm-3 mb-5">
                            <div className="thumb-wrapper">
                              <div className="img-box">
                                <img src="./assets/img/note.jpg" className="img-fluid" alt="" />
                              </div>
                              <div className="thumb-content">
                                <h4>Samsung Book X50 Windows 10 Home Core I7 8gb 1t Hd</h4>
                                <p className="item-price"><span>R$ 5,699.00</span></p>
                                <Link to="!#" className="btn btn-primary">Mais detalhes</Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3 mb-5">
                            <div className="thumb-wrapper">
                              <div className="img-box">
                                <img src="./assets/img/celular-1.jpg" className="img-fluid"
                                  alt="Smartphone Xiaomi Redmi Note 8 64GB Azul Neptune - Blue 4GB RAM 6,3" />
                              </div>
                              <div className="thumb-content">
                                <h4>Smartphone Xiaomi Redmi Note 8 64GB Azul Neptune 4GB RAM</h4>
                                <p className="item-price"><span>R$ 1.952,00</span></p>
                                <Link to="/" className="btn btn-primary">Mais detalhes</Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3 mb-5">
                            <div className="thumb-wrapper">
                              <div className="img-box">
                                <img src="./assets/img/tv.jpg" className="img-fluid"
                                  alt="Smart TV Philco PTV32E20AGBL DLED HD 32" />
                              </div>
                              <div className="thumb-content">
                                <h4>Smart TV Philco PTV32E20AGBL DLED HD 32"</h4>
                                <p className="item-price"><span>R$ 1.099,99</span></p>
                                <Link to="/" className="btn btn-primary">Mais detalhes</Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3 mb-5">
                            <div className="thumb-wrapper">
                              <div className="img-box">
                                <img src="./assets/img/livro.jpg" className="img-fluid"
                                  alt="Programação Web Com Node E Express - Novatec Editora" />
                              </div>
                              <div className="thumb-content">
                                <h4>Livro de Programação Web Com Node E Express</h4>
                                <p className="item-price"><span>R$ 100,00</span></p>
                                <Link to="/" className="btn btn-primary">Mais detalhes</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-sm-3 mb-5">
                            <div className="thumb-wrapper">
                              <div className="img-box">
                                <img src="./assets/img/note.jpg" className="img-fluid" alt="" />
                              </div>
                              <div className="thumb-content">
                                <h4>Samsung Book X50 Windows 10 Home Core I7 8gb 1t Hd</h4>
                                <p className="item-price"><span>R$ 5,699.00</span></p>
                                <Link to="/" className="btn btn-primary">Mais detalhes</Link>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                      <i className="fa fa-angle-left"></i>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                      <i className="fa fa-angle-right"></i>
                    </a>
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
