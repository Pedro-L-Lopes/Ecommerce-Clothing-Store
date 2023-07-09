import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../slices/productSlice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { addCart } from "../../../slices/cartSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const addProductToCart = (productToAdd) => {
    dispatch(addCart(productToAdd));
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

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
