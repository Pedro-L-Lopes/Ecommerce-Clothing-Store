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
                className="text-white bg-black hover:opacity-80 border p-2 h-12 mt-4 ml-2 rounded"
              >
                Confirmar
              </button>
            </div>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <>
                {shippingData && shippingData.localidade && (
                  <div>
                    <div>
                      <p className="font-bold text-lg mt-4">
                        {shippingData.localidade}-{shippingData.uf}
                      </p>
                    </div>

                    <p className="mt-2">Selecione o tipo de envio</p>
                    <label
                      id="sedex"
                      className={`flex items-center justify-between text-lg hover:opacity-80 mt-2 p-2 rounded cursor-pointer ${
                        selectedShipping.tipo === "sedex"
                          ? "bg-green-500"
                          : "bg-black"
                      }`}
                    >
                      <BsTruck size={20} className="text-white" />
                      <p className={`text-white`}>
                        Rápido: {shippingData.prazoEPreco?.[0]?.PrazoEntrega}{" "}
                        dia(s) úteis
                      </p>
                      <p className={`text-white ml-4`}>
                        {shippingData.localidade === "Governador Valadares" ? (
                          <p
                            className={`text-bold ${
                              selectedShipping.tipo === "sedex"
                                ? "text-black"
                                : "text-green-500"
                            }`}
                          >
                            Grátis
                          </p>
                        ) : (
                          <p>R$ {shippingData.prazoEPreco?.[0]?.Valor}</p>
                        )}
                      </p>
                      {selectedShipping === "sedex" ? "" : <BsCheckSquare />}
                      <input
                        type="radio"
                        name="shippingOption"
                        id="sedex"
                        className="hidden"
                        onClick={() =>
                          setSelectedShipping({
                            PrazoEntrega:
                              shippingData.prazoEPreco?.[0]?.PrazoEntrega,
                            Valor:
                              shippingData.localidade === "Governador Valadares"
                                ? 0
                                : shippingData.prazoEPreco?.[0]?.Valor,
                            localidade: shippingData.localidade,
                            uf: shippingData.uf,
                            tipo: "sedex",
                            cep: shippingData.cep,
                            logradouro: shippingData.logradouro,
                            bairro: shippingData.bairro,
                          })
                        }
                      />
                    </label>

                    <label
                      id="pac"
                      className={`flex items-center justify-between text-lg hover:opacity-80 mt-2 p-2 rounded cursor-pointer ${
                        selectedShipping.tipo === "pac"
                          ? "bg-green-500"
                          : "bg-black"
                      }`}
                    >
                      <BsTruck size={20} className="text-white" />
                      <p className={`text-white`}>
                        econômico: {shippingData.prazoEPreco?.[1]?.PrazoEntrega}{" "}
                        dia(s) úteis
                      </p>
                      <p className={`text-white ml-4`}>
                        {shippingData.localidade === "Governador Valadares" ? (
                          <p
                            className={`text-bold ${
                              selectedShipping.tipo === "pac"
                                ? "text-black"
                                : "text-green-500"
                            }`}
                          >
                            Grátis
                          </p>
                        ) : (
                          <p>R$ {shippingData.prazoEPreco?.[1]?.Valor}</p>
                        )}
                      </p>
                      {selectedShipping === "pac" ? "" : <BsCheckSquare />}
                      <input
                        type="radio"
                        name="shippingOption"
                        id="pac"
                        className="hidden"
                        onClick={() =>
                          setSelectedShipping({
                            PrazoEntrega:
                              shippingData.prazoEPreco?.[1]?.PrazoEntrega,
                            Valor:
                              shippingData.localidade === "Governador Valadares"
                                ? 0
                                : shippingData.prazoEPreco?.[1]?.Valor,
                            localidade: shippingData.localidade,
                            uf: shippingData.uf,
                            tipo: "pac",
                            cep: shippingData.cep,
                            logradouro: shippingData.logradouro,
                            bairro: shippingData.bairro,
                          })
                        }
                      />
                    </label>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="w-96">
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl">Resumo do pedido</h2>
              <div className="flex justify-between mt-2 border-b">
                <p className="">Subtotal: </p>
                <p>{formatPrice(calculateTotalPrice())}</p>
              </div>
              <div className="flex justify-between mt-2 border-b">
                <p>Frete:</p>
                {shippingData.localidade === "Governador Valadares" ? (
                  <p className="text-bold text-green-500">Grátis</p>
                ) : (
                  <p>
                    {formatPrice(selectedShipping && selectedShipping.Valor)}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-2 border-b">
                <p className="">Total do pedido: </p>
                <p>
                  {formatPrice(
                    calculateTotalPrice() +
                      (selectedShipping && selectedShipping.Valor
                        ? parseFloat(selectedShipping.Valor.replace(",", "."))
                        : 0)
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/makeapurchase">
                <button className="text-white bg-black hover:opacity-80 w-44 h-12 p-2 m-2 mt-5 rounded-md">
                  Continuar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
