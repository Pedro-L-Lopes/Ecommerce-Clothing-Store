import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../../slices/cartSlice";
import { formatPrice } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import ProductCart from "../../../components/ProductCart/ProductCart";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const removeProductFromCart = (cartItemId) => {
    dispatch(removeCart(cartItemId));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((product) => {
      const productPrice = product.onSale ? product.salePrice : product.price;
      const productAndQuantity = productPrice * product.quantity;
      totalPrice += productAndQuantity  ;
    });
    return totalPrice;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center border border-red-500">
        {cart.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <>
            {cart.map((product) => (
              <ProductCart
                key={product._id}
                product={product}
                removeProductFromCart={removeProductFromCart}
              />
            ))}
          </>
        )}
        <p>Total: {formatPrice(calculateTotalPrice())}</p>
        <button className="text-white bg-slate-800 p-2 m-2 rounded-md">Finalizar compra</button>
      </div>
    </div>
  );
};

export default Cart;
