import React, { useState } from 'react';

const SelectWithHover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Hover para abrir o select
      </div>

      {isOpen && (
        <select>
          <option value="option1">Opção 1</option>
          <option value="option2">Opção 2</option>
          <option value="option3">Opção 3</option>
        </select>
      )}
    </div>
  );
};

export default SelectWithHover;

// removeCart: (state, action) => {
//   const { cartItemId } = action.payload;

//   const existingItemIndex = state.findIndex(
//     (item) => item.cartItemId === cartItemId
//   );

//   if (existingItemIndex !== -1) {
//     const existingItem = state[existingItemIndex];
//     if (existingItem.quantity > 1) {
//       existingItem.quantity -= 1;
//     } else {
//       state.splice(existingItemIndex, 1);
//     }
//   }

//   localStorage.setItem("cart", JSON.stringify(state));
// },
