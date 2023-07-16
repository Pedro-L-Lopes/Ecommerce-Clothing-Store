import React, { useEffect } from "react";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartCard = ({ cart, close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((totalPrice, product) => {
      const productPrice = product.onSale ? product.salePrice : product.price;
      const productAndQuantity = productPrice * product.quantity;
      return totalPrice + productAndQuantity;
    }, 0);
  };

  const shouldShowScrollBar = cart.length > 4;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white">
        <h2 className="text-white text-xl font-bold text-center p-2 bg-black">
          Meu Carrinho
        </h2>
        <div
          className={`p-4 -mt-2 ${
            shouldShowScrollBar ? "max-h-96 overflow-y-auto" : ""
          }`}
        >
          {cart && cart.length > 0 ? (
            cart.map((product) => (
              <div
                className="flex items-center justify-start mt-4"
                key={product.cartItemId}
              >
                <div className=" text-white font-bold bg-black w-6 h-6 rounded-full mt-12 -ml-2">
                  <p className="flex items-center justify-center">
                    {product.quantity}
                  </p>
                </div>
                <img
                  className="w-16 h-16"
                  src={`${uploads}/products/${product.images[0].filename}`}
                  alt={product.name}
                />
                <div className="text-base ml-2 w-48 mr-2">
                  <p className="font-bold text-black opacity-80">
                    {product.name}
                  </p>
                  <p className="opacity-70 mt-2">
                    Tamanho {product.selectedSize}
                  </p>
                </div>
                <div className="ml-2">
                  <p className="font-bold">
                    {product.onSale
                      ? formatPrice(product.salePrice * product.quantity)
                      : formatPrice(product.price * product.quantity)}
                  </p>
                  {product.quantity > 1 ? (
                    <p className="">
                      (
                      {formatPrice(
                        product.onSale ? product.salePrice : product.price
                      )}
                      <span className="ml-1">Cada</span>)
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>O carrinho está vazio.</p>
          )}
        </div>
        <div className="flex items-center justify-center border-t p-2 mt-2">
          <p className="font-bold opacity-90">
            Subtotal: {formatPrice(calculateTotalPrice())}
          </p>
        </div>
        <div className="flex justify-center items-center mt-5 mb-3">
          <button
            onClick={close}
            className="text-white font-bold bg-black mr-2 hover:opacity-90 p-3 rounded transition-all"
          >
            Continuar comprando
          </button>
          <Link to="/cart">
            <button className="flex items-center text-white font-bold bg-black hover:opacity-90 p-3 rounded transition-all">
              <AiOutlineShoppingCart size={20} className="text-white mr-2" />
              Ir para o carrinho
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
