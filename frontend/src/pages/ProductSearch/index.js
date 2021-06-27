import React, { useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemProduct from "../../components/ItemProduct";

import imgSearcher from "../../assets/img/search.svg";
import imgSearchEmpty from "../../assets/img/search_empty.svg";

function ProductSearch() {
  const [searchProducts, setSearchProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleBtnSearch(e) {
    e.preventDefault();
    try {
      setSearchProducts([]);
      setLoading(true);
      const res = await api.get(`product/?searchItem=${search}`);
      setSearchProducts(res.data.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {loading === true ? (
        <div>
          <Header
            value={search}
            submit={handleBtnSearch}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <main className="content">
            <div className="container">
              <div className="title__section">
                Esperando para buscar seu produto!
              </div>
              <div className="row">
                <div className="col-md-12">
                  <img src={imgSearcher} className="search__img" alt="search" />
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      ) : (
          <>
            <Header
              value={search}
              submit={handleBtnSearch}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <main className="content">
              <div className="container">
                <div className="title__section">
                  {searchProducts.length === 0 ? (
                    <div>
                      <img src={imgSearchEmpty} className="search__img" alt="search" />
                      Não foi possivel encontra essa busca.
                    </div>
                  ) : (
                      <div>Os produtos abaixo foram o resultado da sua busca.</div>
                    )}
                </div>
                <div className="row">
                  {searchProducts.map(
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
              </div>
              <Footer />
            </main>
          </>
        )}
    </div>
  );
}

export default ProductSearch;
