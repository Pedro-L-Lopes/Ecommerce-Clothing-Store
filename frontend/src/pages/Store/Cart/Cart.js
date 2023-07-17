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
import { BsTruck } from "react-icons/bs";

const MemoizedProductCart = React.memo(ProductCart);

const Cart = () => {
  const dispatch = useDispatch();
  const shippingData = useSelector((state) => state.shipping.data);
  const cart = useSelector((state) => state.cart);

  const [cep, setCep] = useState("");

  console.log(shippingData);

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
        <div className="flex mt-5">
          <div className="w-96 mr-20">
            <h2 className="font-bold text-xl mb-2">Frete</h2>
            <div className="flex">
              <div className="flex flex-col">
                <label htmlFor="cep" className="text-xs mb-1">
                  CEP
                </label>
                <input
                  id="cep"
                  type="text"
                  placeholder="CEP: 00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="p-2 border-b-2 border-black rounded bg-gray-100 opacity-70"
                />
              </div>
              <button
                onClick={handleSearchCep}
                className="text-white bg-black hover:opacity-80 border w-12 h-12 mt-4 ml-2 rounded"
              >
                Usar
              </button>
            </div>
            {shippingData && shippingData.localidade && (
              <div>
                <div>
                  <p className="font-bold text-lg mt-4">
                    {shippingData.localidade}-{shippingData.uf}
                  </p>
                  <p>{shippingData.logradouro}</p>
                  <p>{shippingData.bairro}</p>
                </div>
                {shippingData.prazoEPreco.map((item) => (
                  <div
                    className="flex items-center text-lg bg-slate-900 hover:opacity-80 mt-4 p-2 rounded cursor-pointer"
                    key={item.Codigo}
                  >
                    <BsTruck size={20} className="text-white mr-2" />
                    <p className="text-white font-bold mr-4">R$ {item.Valor}</p>
                    <p className="text-white font-bold">
                      Prazo: {item.PrazoEntrega} dia(s) úteis
                    </p>
                  </div>
                ))}
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
