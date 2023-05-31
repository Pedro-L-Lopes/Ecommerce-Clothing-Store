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
      />
      <span
        className={`rounded-full h-8 w-8 flex items-center justify-center border border-gray-300 ${
          checked ? "bg-blue-500 text-white" : "text-gray-400"
        } cursor-pointer hover:opacity-75 transition-opacity`}
      >
        {size}
      </span>
    </label>
  );
};

export default SizeCheckbox;
