import "./Product.css";

import { uploads } from "../../../utils/config";

// Components
import Message from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import ProductItem from "../../../components/ProductItem/ProductItem";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getProduct } from "../../../slices/productSlice";

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
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <ProductItem product={product} />
    </div>
  );
};

export default Product;
