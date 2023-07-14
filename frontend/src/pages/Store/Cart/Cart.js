import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../../slices/cartSlice";
import {
  formatPrice,
  PageColor,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import ProductCart from "../../../components/ProductCart/ProductCart";

const MemoizedProductCart = React.memo(ProductCart);

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    PageColor("white");
  }, []);

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
      <div className="flex flex-col items-center justify-center border border-red-500">
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
        <p>Total: {formatPrice(calculateTotalPrice())}</p>
        <button className="text-white bg-slate-800 p-2 m-2 rounded-md">
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
