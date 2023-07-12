import React, { useEffect, useState } from "react";

import { uploads } from "../../utils/config";

import ChooseProductSize from "../chooseProductSize/chooseProductSize";
import Carousel from "../Carousel/Carousel";

import { Link } from "react-router-dom";

import { MdPix } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { AiFillSafetyCertificate } from "react-icons/ai";

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
      setCartMsg("SELECIONE UM TAMANHO!");
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
      <div className="">
        <Carousel
          images={product.images?.map((image) => image.filename) || []}
        />
      </div>
      <div className="flex flex-col ml-10">
        <div>
          <h2 className="mt-4">{product.name}</h2>
          <div className="flex mt-2">
            {product.onSale ? (
              <>
                <h2 className="text-4xl font-bold text-red-500">
                  R${product.salePrice}
                </h2>{" "}
                <h2 className="text-2xl opacity-50 line-through ml-2 mt-2">
                  R${product.price}
                </h2>
              </>
            ) : (
              <h2 className="text-4xl font-bold">R${product.price}</h2>
            )}
          </div>
          <div className="flex p-1 mt-2 bg-gray-100 opacity-60 justify-center">
            <MdPix className="mt-1 mr-1" />
            <p>Aceitamos pix</p>
          </div>
        </div>

        <div>
          <p className="text-md font-bold mt-4 mb-2">Tamanhos disponíveis</p>
          <ChooseProductSize
            product={product}
            productSizes={product.size}
            selectedSize={selectedSize}
            cartMsg={cartMsg}
            setSelectedSize={setSelectedSize}
          />
        </div>

        <p className="text-blue-500 text-sm mt-2 mb-2">Guia de tamanhos</p>

        {!cartMsg ? (
          <button
            className="flex text-white justify-center font-bold bg-black hover:opacity-80 p-4 mt-2 rounded transition-all"
            onClick={handleAddToCart}
          >
            ADICIONAR AO CARRINHO
          </button>
        ) : (
          <button
            className="flex text-white bg-red-600 justify-center font-bold p-4 mt-2 rounded transition-all"
            onClick={handleAddToCart}
          >
            {cartMsg}
          </button>
        )}
        <div className="fixed bottom-0 right-0 ml-4 mb-4 group">
          <Link>
            <div className="flex text-white bg-green-600 p-2 rounded">
              <BsWhatsapp size={20} className="text-white mt-1 mr-1" />
              <p className="hidden group-hover:block">
                Comprar ou tirar duvidas
              </p>
            </div>
          </Link>
        </div>
        <div className="bg-gray-100 mt-4">
          <div className="flex p-2">
            <FiTruck size={22} className="text-green-500 mr-2" />
            <p className="font-bold text-sm">Frete grátis</p>
          </div>
          <p className="text-sm text-gray-400 p-2 -mt-3">
            Entrega grátis em Governador Valadares e região
          </p>
          <p className="text-sm text-gray-400 p-2 -mt-3">
            Outras cidades necessário consultar os correios
          </p>
          <div className="flex p-2">
            <AiFillSafetyCertificate
              size={22}
              className="text-green-500 mr-2"
            />
            <p className="font-bold text-sm">Devolução grátis</p>
          </div>
          <p className="text-sm text-gray-400 p-2 -mt-3">
            Devolução grátis em Governador Valadares e região
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductItem;
