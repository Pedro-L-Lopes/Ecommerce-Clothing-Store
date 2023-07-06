import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../../slices/cartSlice";

// Component
import ProductCart from "../../../components/ProductCart/ProductCart";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const removeProductToCart = (id) => {
    dispatch(removeCart(id));
  };

  console.log(cart);

  return (
    <div>
      <div className="flex flex-col">
        {cart.length === 0 ? (
          <p>Carrinho vazinho</p>
        ) : (
          <>
            {cart.map((product) => (
              <ProductCart
                key={product._id}
                product={product}
                removeProductToCart={removeProductToCart}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
