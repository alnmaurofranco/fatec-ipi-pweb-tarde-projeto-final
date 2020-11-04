import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemProduct from "../../components/ItemProduct";

import { useParams } from "react-router-dom";
import swal from "sweetalert";

function Departamento() {
  const params = useParams();
  const [departamento, setDepartamento] = useState([]);

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await api.get(`product/?searchItem=${params.name}`);
    //     setDepartamento(response.data.data);
    //   } catch (error) {
    //     if (error.response) {
    //       swal("Ocorreu um erro!", error.response.data.message, "error");
    //     }
    //   }
    // })();
    (async () => {
      try {
        const response = await api.get(`category/${params.name}`);
        setDepartamento(response.data.data);
      } catch (error) {
        if (error.response) {
          swal("Ocorreu um erro!", error.response.data.message, "error");
        }
      }
    })();
  }, [params.name])

  return (
    <>
      <Header />
      <main className="content">
        <div className="container">
          <div className="title__section">
            Departamento de {params.name.toLocaleLowerCase()}.
                </div>
          <div className="row">
            {departamento.map(
              ({ name, products }) => (
                products.map(
                  ({ id, title, price, slug, image_url }) => (
                    <ItemProduct
                      key={id}
                      name={title}
                      price={price}
                      img={image_url}
                      url={slug}
                      categorys={name}
                    />
                  )
                )
              )
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Departamento;
