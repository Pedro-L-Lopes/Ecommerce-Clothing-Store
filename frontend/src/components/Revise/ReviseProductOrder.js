import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../slices/productSlice";
import { uploads } from "../../utils/config";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const ReviseProductOrder = ({ product }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    dispatch(getProduct(product.productId))
      .then((response) => {
        setProductData(response.payload);
      })
      .catch((error) => {
        console.log("Erro ao obter os dados do produto:", error);
      });
  }, [dispatch, product.productId]);

  return (
    <div>
      {productData && (
        <div className="flex">
          <div className="flex items-center justify-between m-2 bg-gray-100 rounded shadow">
            <div className="mr-4">
              {productData.images && productData.images.length > 0 && (
                <img
                  className="w-28 h-28 rounded"
                  src={`${uploads}/products/${productData.images[0].filename}`}
                  alt={productData.name}
                />
              )}
            </div>
            <div className="w-80">
              <p className="font-bold">{productData.name}</p>
              <p className="text-xs opacity-60">codigo: {productData.code}</p>
              <p>Tamanho {product.selectedSize}</p>
              <p>Quantidade: {product.quantity}</p>
            </div>
            <div className="text-center w-36">
              <p className="text-2xl font-bold">{formatPrice(product.value)}</p>
              {product.quantity > 1 ? (
                <p className="">
                  ({formatPrice(product.value)}
                  <span className="ml-1">Cada</span>)
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviseProductOrder;
