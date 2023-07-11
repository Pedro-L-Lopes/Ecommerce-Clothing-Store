import React, { useEffect } from "react";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

const CartCard = ({ cart, close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Desabilitar rolagem quando o componente é montado
    return () => {
      document.body.style.overflow = "auto"; // Restaurar rolagem quando o componente é desmontado
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8">
        <h2>Meu Carrinho</h2>
        {cart && cart.length > 0 ? (
          cart.map((product) => (
            <div className="w-20 h-24" key={product.cartItemId}>
              <img
                className="w-10 h-10"
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
              <div>
                <p>{product.name}</p>
                <p>{product.onSale ? product.salePrice : product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>O carrinho está vazio.</p>
        )}
        <div className="">
          <button onClick={close} className="bg-gray-500 p-2 m-2 rounded">Continuar comprando</button>
          <Link to="/cart">
            <button className="bg-slate-500 p-2 m-2 rounded">Ir para o carrinho</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
