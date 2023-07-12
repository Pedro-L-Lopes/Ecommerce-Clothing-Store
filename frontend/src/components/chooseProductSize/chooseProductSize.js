import React from "react";

const ChooseProductSize = ({
  productSizes,
  selectedSize,
  setSelectedSize,
  cartMsg,
}) => {
  return (
    <div className="flex items-center">
      {productSizes &&
        productSizes.map((size) => (
          <ChooseSizeButton
            key={size}
            size={size}
            cartMsg={cartMsg}
            checked={selectedSize === size}
            onChange={() => setSelectedSize(size)}
          />
        ))}
    </div>
  );
};

const ChooseSizeButton = ({ size, checked, onChange, cartMsg }) => {
  return (
    <label className={`flex items-center mr-2`}>
      <input
        type="radio"
        value={size}
        checked={checked}
        onChange={onChange}
        className="form-checkbox mr-1 hidden"
        required
      />
      <span
        className={`rounded-md h-12 w-12 flex items-center justify-center border ${
          cartMsg ? "border border-red-600" : ""
        } border-gray-300 ${
          checked ? "bg-green-500 text-white" : "text-gray-400"
        } cursor-pointer hover:opacity-75 hover:bg-green-100 hover:text-black transition-opacity `}
      >
        {size}
      </span>
    </label>
  );
};

export default ChooseProductSize;
