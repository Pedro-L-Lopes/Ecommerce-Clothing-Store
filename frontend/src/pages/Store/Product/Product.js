import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../slices/productSlice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { addCart } from "../../../slices/cartSlice";
import CartCard from "../../../components/CartCard/CartCard";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { products, product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [cartMessage, setCartMessage] = useState("");

  const addProductToCart = useCallback(
    (productToAdd) => {
      dispatch(addCart(productToAdd));
      setCartMessage("Produto adicionado ao carrinho");
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Navbar />
      <main className="mt-20">
        <ProductItem
          product={product}
          products={products}
          addProductToCart={addProductToCart}
        />
      </main>
      {cartMessage && <CartCard cart={cart} close={() => setCartMessage("")} />}
      <Footer />
    </div>
  );
};

export default Product;
