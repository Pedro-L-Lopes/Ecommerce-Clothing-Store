import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploads } from "../../utils/config";
import { removeCart, updateCartQuantity } from "../../slices/cartSlice";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlineDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCart = ({ product, hidden }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removingProduct, setRemovingProduct] = useState(false);

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

  const removeProduct = () => {
    setRemovingProduct(true);
    dispatch(removeCart(product.cartItemId));

    setTimeout(() => {
      setRemovingProduct(false);
      setShowDeleteModal(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex items-center justify-between mt-5 m-2">
          <div className="mr-4">
            {product.images && product.images.length > 0 && (
              <img
                className="w-28 h-28"
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
            )}
          </div>
          <div className="w-96">
            <Link to={`/products/${product._id}`}>
              <p className="font-bold underline">{product.name}</p>
            </Link>
            <p>Tamanho {product.selectedSize}</p>
          </div>
          <div className="flex items-center justify-center w-24 border rounded-md">
            <button
              onClick={decreaseQuantity}
              className={`w-8 h-8 m-2 opacity-50 hover:opacity-80 transition-all ${hidden}`}
            >
              <AiOutlineMinusSquare size={25} />
            </button>
            <p className="font-bold">{quantity}</p>
            <button
              onClick={increaseQuantity}
              className={`w-8 h-8 m-2 opacity-50 hover:opacity-80 transition-all ${hidden}`}
            >
              <AiOutlinePlusSquare size={25} className="" />
            </button>
          </div>
          <div className="text-center w-36 ml-2">
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
          <button onClick={() => setShowDeleteModal(true)} className="m-4">
            <AiOutlineDelete size={30} />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmation
          title={"Remover produto do carrinho?"}
          close={() => setShowDeleteModal(false)}
          remove={removeProduct}
        />
      )}
      {removingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p>Removendo produto...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
