import "./Product.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import ProductItem from "../../components/ProductItem";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getProduct } from "../../slices/photoSlice";

const Product = () => {
  const { id } = useParams(); // Id do produto pela url

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth); // Id do user que esta logado

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  //Carregando dados do produto
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando infinito</p>;
  }

  return (
    <div id="photo">
      <ProductItem product={product} />
    </div>
  );
};

export default Product;
