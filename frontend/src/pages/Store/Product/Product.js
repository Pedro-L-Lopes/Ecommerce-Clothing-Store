import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../slices/productSlice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { addCart } from "../../../slices/cartSlice";
import CartCard from "../../../components/CartCard/CartCard";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [cartMessage, setCartMessage] = useState("");

  const addProductToCart = (productToAdd) => {
    dispatch(addCart(productToAdd));
    setCartMessage("Produto adicionado ao carrinho");
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log(product);

  return (
    <div>
      <ProductItem product={product} addProductToCart={addProductToCart} />
      {cartMessage && <CartCard cart={cart} close={() => setCartMessage("")} />}
    </div>
  );
};

export default Product;
