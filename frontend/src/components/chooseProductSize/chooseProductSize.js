import React from "react";

const ChooseProductSize = ({
  product,
  productSizes,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="flex items-center">
      {productSizes &&
        productSizes.map((size) => (
          <ChooseSizeButton
            key={size}
            size={size}
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
        className={`rounded-md h-10 w-10 flex items-center justify-center border ${
          cartMsg ? "bg-red-500" : ""
        } border-gray-300 ${
          checked ? "bg-green-500 text-white" : "text-gray-400"
        } cursor-pointer hover:opacity-75 transition-opacity `}
      >
        {size}
      </span>
    </label>
  );
};

export default ChooseProductSize;
