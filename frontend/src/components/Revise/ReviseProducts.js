import { uploads } from "../../utils/config";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const ReviseProducts = ({ product }) => {
  return (
    <div>
      <div className="flex">
        <div className="flex items-center justify-between m-2 bg-gray-100 shadow">
          <div className="mr-4">
            {product.images && product.images.length > 0 && (
              <img
                className="w-28 h-28 rounded"
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
            )}
          </div>
          <div className="w-80">
            <p className="font-bold">{product.name}</p>
            <p className="text-xs opacity-60">codigo: {product.code}</p>
            <p>Tamanho {product.selectedSize}</p>
            <p>Quantidade: {product.quantity}</p>
          </div>
          <div className="text-center w-36">
            <p className="text-2xl font-bold">
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
      </div>
    </div>
  );
};

export default ReviseProducts;
