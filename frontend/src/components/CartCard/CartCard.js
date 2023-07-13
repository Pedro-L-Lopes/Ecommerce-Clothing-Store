import React, { useEffect } from "react";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const CartCard = ({ cart, close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-white text-xl font-bold text-center p-2 bg-black rounded">
          Meu Carrinho
        </h2>
        {cart && cart.length > 0 ? (
          cart.map((product) => (
            <div
              className="flex items-center justify-start mt-1"
              key={product.cartItemId}
            >
              <img
                className="w-10 h-10"
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
              <div className="ml-2">
                <p>{product.name}</p>
                <p>Quantidade: {product.quantity}</p>
              </div>
              <div className="ml-2">
                <p className=" font-bold">
                  {product.onSale
                    ? formatPrice(product.salePrice * product.quantity)
                    : formatPrice(product.price * product.quantity)}
                </p>
                <p className="">
                  (
                  {formatPrice(
                    product.onSale ? product.salePrice : product.price
                  )}
                  <span className="ml-1">Cada</span>)
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>O carrinho está vazio.</p>
        )}
        <div className="">
          <button onClick={close} className="bg-gray-500 p-2 m-2 rounded">
            Continuar comprando
          </button>
          <Link to="/cart">
            <button className="bg-slate-500 p-2 m-2 rounded">
              Ir para o carrinho
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
