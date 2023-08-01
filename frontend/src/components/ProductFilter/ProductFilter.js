import { useState } from "react";
import { allCategories } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const ProductFilter = ({
  categoryFilter,
  promotionFilter,
  onCategoryChange,
  onPromotionChange,
}) => {
  const [Pfilter, setPFilter] = useState(false);

  const handleFilterChange = (e) => {
    const checked = e.target.checked;
    setPFilter(checked);
    onPromotionChange(checked ? "true" : "");
  };

  return (
    <div className="flex flex-col items-c text-xl font-bold bg-gray-100 w-56 h-screen shadow-md mt-14">
      <div className="flex flex-col items-center">
        <label className="flex items-center justify-center p-2">
          Categoria:
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border m-2"
        >
          <option value="">Todas</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label
          htmlFor="promocao"
          className="flex items-center justify-center gap-2 p-2 m-2"
        >
          Promoção
          <div className="flex ">
            {Pfilter ? (
              <MdOutlineCheckBox size={30} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={30} />
            )}
          </div>
        </label>
        <input
          type="checkbox"
          name="promocao"
          id="promocao"
          checked={Pfilter}
          onChange={handleFilterChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
