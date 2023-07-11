import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploads } from "../../utils/config";
import { removeCart, updateCartQuantity } from "../../slices/cartSlice";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateCartQuantity({
          cartItemId: product.cartItemId,
          quantity: newQuantity,
        })
      );
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      updateCartQuantity({
        cartItemId: product.cartItemId,
        quantity: newQuantity,
      })
    );
  };

  const removeProductFromCart = () => {
    dispatch(removeCart(product.cartItemId));
  };

  return (
    <div>
      <div className="flex">
        <div className="flex justify-between w-80 mt-5 m-2 bg-slate-700">
          {product.images && product.images.length > 0 && (
            <img
              className="w-20 h-20"
              src={`${uploads}/products/${product.images[0].filename}`}
              alt={product.name}
            />
          )}
          <div>
            <p>{product.name}</p>
            <p>{product.onSale ? product.salePrice : product.price}</p>
            <p>Selected Size: {product.selectedSize}</p>
            <p>Quantity: {quantity}</p>
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 bg-white m-2 rounded"
            >
              -1
            </button>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 bg-white m-2 rounded"
            >
              +1
            </button>
          </div>
          <button onClick={removeProductFromCart} className="bg-red-600">
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
