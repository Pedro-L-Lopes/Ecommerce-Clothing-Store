import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../../slices/cartSlice";
import {
  fetchShippingByCep,
  fetchCalculateTermsAndPrice,
} from "../../../slices/shippingSlice";
import {
  formatPrice,
  PageColor,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import ProductCart from "../../../components/ProductCart/ProductCart";

const MemoizedProductCart = React.memo(ProductCart);

const Cart = () => {
  const dispatch = useDispatch();
  const [cep, setCep] = useState("");
  const shippingData = useSelector((state) => state.shipping.data);
  const cart = useSelector((state) => state.cart);

  console.log(shippingData)

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
        <div className="flex border">
          <div className="mr-4">
            <h2>Frete</h2>
            <label>CEP: </label>
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <button onClick={handleSearchCep}>Buscar</button>
            {shippingData && (
              <div>
                <div>
                  <p>
                    {shippingData.localidade}-{shippingData.uf}
                  </p>
                  <p>
                    {shippingData.logradouro}, {shippingData.bairro}
                  </p>
                </div>
                <p>Valor: {shippingData[0]?.Valor}</p>
                <p>
                  Prazo de entrega: {shippingData[0]?.PrazoEntrega} dias úteis
                </p>

                <p>Valor: {shippingData[1]?.Valor}</p>
                <p>
                  Prazo de entrega: {shippingData[1]?.PrazoEntrega} dias úteis
                </p>
              </div>
            )}
          </div>
          <div className="w-96">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl">Resumo do pedido</h2>
              <div className="flex justify-between">
                <p className="">Subtotal: </p>
                <p>{formatPrice(calculateTotalPrice())}</p>
              </div>
              <div className="flex justify-between">
                <p>Frete:</p>
                <p>Grátis</p>
              </div>
              <div className="flex justify-between">
                <p className="">Total do pedido: </p>
                <p>{formatPrice(calculateTotalPrice())}</p>
              </div>
            </div>
            <button className="text-white bg-black w-44 h-12 p-2 m-2 rounded-md">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
