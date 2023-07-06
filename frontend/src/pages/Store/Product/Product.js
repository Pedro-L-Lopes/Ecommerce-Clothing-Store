import "./Product.css";

import { uploads } from "../../../utils/config";

// Components
import Message from "../../../components/Message/Message";
import ProductItem from "../../../components/ProductItem/ProductItem";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getProduct } from "../../../slices/productSlice";
import { addCart } from "../../../slices/cartSlice";

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

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <ProductItem product={product} addProductToCart={addProductToCart} />
    </div>
  );
};

export default Product;
