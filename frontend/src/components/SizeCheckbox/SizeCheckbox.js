import React from "react";

const SizeCheckbox = ({ size, checked, onChange }) => {
  return (
    <label className="flex items-center mr-2">
      <input
        type="checkbox"
        value={size}
        checked={checked}
        onChange={onChange}
        className="form-checkbox mr-1 hidden"
        required
      />
      <span
        className={`rounded-md h-8 w-8 flex items-center justify-center border border-gray-300 ${
          checked ? "bg-[#0e0e0e] text-white" : "text-gray-400"
        } cursor-pointer hover:opacity-75 transition-opacity`}
      >
        {size}
      </span>
    </label>
  );
};

export default SizeCheckbox;

// {previewImages.length === 0 && (
//   <p className="cursor-pointer hover:opacity-75 transition-opacity">
//     Clique para adicionar imagens
//   </p>
// )}
