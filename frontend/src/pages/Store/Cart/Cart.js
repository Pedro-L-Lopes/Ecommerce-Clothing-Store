// Cart.js

// Hooks
import React, { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../../slices/cartSlice";
import {
  fetchShippingByCep,
  fetchCalculateTermsAndPrice,
} from "../../../slices/shippingSlice";

// Funtions and components
import {
  formatPrice,
  PageColor,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import ProductCart from "../../../components/ProductCart/ProductCart";
import { BsTruck, BsCheckSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import ShippingSection from "../../../components/ShippingSection/ShippingSection";

const MemoizedProductCart = React.memo(ProductCart);

const Cart = () => {
  const dispatch = useDispatch();
  const shippingData = useSelector((state) => state.shipping.data);
  const loading = useSelector((state) => state.shipping.loading);
  const cart = useSelector((state) => state.cart);

  const [cep, setCep] = useState("");
  const [selectedShipping, setSelectedShipping] = useState({
    PrazoEntrega: null,
    Valor: 0,
    localidade: null,
    tipo: null,
    logradouro: null,
    bairro: null,
    cep: null,
  });

  localStorage.setItem("cartData", JSON.stringify(selectedShipping));

  useEffect(() => {
    PageColor("white");
  }, []);

  const handleSearchCep = () => {
    dispatch(fetchShippingByCep(cep));
    dispatch(fetchCalculateTermsAndPrice(cep));
  };

  const removeProductFromCart = (cartItemId) => {
    dispatch(removeCart(cartItemId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((totalPrice, product) => {
      const productPrice = product.onSale ? product.salePrice : product.price;
      const productAndQuantity = productPrice * product.quantity;
      return totalPrice + productAndQuantity;
    }, 0);
  };

  console.log(selectedShipping);
  console.log(shippingData);

  return (
    <div>
      <div className="flex items-center border-b-2 mt-5">
        <h1 className="font-bold text-3xl ml-80">Meu carrinho</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        {cart.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <>
            {cart.map((product) => (
              <MemoizedProductCart
                key={product._id}
                product={product}
                removeProductFromCart={removeProductFromCart}
              />
            ))}
          </>
        )}

        {/* Insert the ShippingSection component */}
        <ShippingSection
          cep={cep}
          setCep={setCep}
          handleSearchCep={handleSearchCep}
          loading={loading}
          shippingData={shippingData}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          calculateTotalPrice={calculateTotalPrice}
          to={"/fldcpcop1"}
          textSize={"text-lg"}
        />
      </div>
    </div>
  );
};

export default Cart;
