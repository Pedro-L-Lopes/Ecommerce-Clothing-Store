import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../slices/productSlice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { addCart } from "../../../slices/cartSlice";
import CartCard from "../../../components/CartCard/CartCard";
import { PageColor } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

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
    PageColor("white");
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <ProductItem
        product={product}
        products={products}
        addProductToCart={addProductToCart}
      />
      {cartMessage && <CartCard cart={cart} close={() => setCartMessage("")} />}
    </div>
  );
};

export default Product;
