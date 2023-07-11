import React from "react";
import { allCategories } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const ProductFilter = ({
  categoryFilter,
  promotionFilter,
  onCategoryChange,
  onPromotionChange,
}) => {
  return (
    <div className="filter-container">
      <h2>Filtrar:</h2>
      <div className="filter-options">
        <label>
          Categoria:
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Todos</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-options">
        <label>
          Promoção:
          <select
            value={promotionFilter}
            onChange={(e) => onPromotionChange(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Em Promoção</option>
            <option value="false">Sem Promoção</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
