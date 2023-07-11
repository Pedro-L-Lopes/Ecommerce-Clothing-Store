import React, { useEffect, useState } from "react";
import { uploads } from "../../utils/config";
import Product from "../../pages/Store/Product/Product";
import { MdPix } from "react-icons/md";
import ChooseProductSize from "../chooseProductSize/chooseProductSize";

const ProductItem = ({ product, addProductToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cartMsg, setCartMsg] = useState("");

  const handleAddToCart = () => {
    if (selectedSize) {
      const productToAdd = {
        ...product,
        selectedSize: selectedSize,
        quantity: selectedQuantity,
      };
      addProductToCart(productToAdd);
    } else {
      setCartMsg("Selecione um tamanho!");
    }
  };

  useEffect(() => {
    if (cartMsg) {
      const timer = setTimeout(() => {
        setCartMsg("");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [cartMsg]);

  return (
    <main className="flex justify-center mt-8">
      {product.images &&
        product.images.slice(0, 1).map((image, index) => (
          <div className="">
            <img
              style={{ width: "500px", height: "700px" }}
              className="rounded object-top object-cover"
              key={index}
              src={`${uploads}/products/${image.filename}`}
              alt={product.name}
            />
          </div>
        ))}
      <div className="flex flex-col ml-10">
        <div>
          <h2 className="mt-4">{product.name}</h2>
          <div className="flex mt-2">
            {product.onSale ? (
              <>
                <h2 className="text-4xl text-red-500">R${product.salePrice}</h2>{" "}
                <h2 className="text-2xl opacity-50 line-through ml-2 mt-2">
                  R${product.price}
                </h2>
              </>
            ) : (
              <h2>R${product.price}</h2>
            )}
          </div>
          <div className="flex p-1 mt-2 bg-gray-200 opacity-60 justify-center">
            <MdPix className="mt-1 mr-1" />
            <p>Pague com pix</p>
          </div>
        </div>

        <div>
          <p className="text-md mt-4">Tamanho</p>
          <ChooseProductSize
            product={product}
            productSizes={product.size}
            selectedSize={selectedSize}
            cartMsg={cartMsg}
            setSelectedSize={setSelectedSize}
          />
        </div>

        {cartMsg && <p className="text-red-700 text-center">{cartMsg}</p>}

        <button
          className="text-white bg-black p-2 rounded"
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </main>
  );
};

export default ProductItem;
