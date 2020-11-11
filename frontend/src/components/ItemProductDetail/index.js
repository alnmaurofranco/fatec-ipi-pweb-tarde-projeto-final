import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ItemProduct from "../ItemProduct";

function ItemProductDetail(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/product/rating/all/${props.category[0]}`);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, [props.category[0]]);

  return (
    <>
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
    </>
  );
}

export default ItemProductDetail;
