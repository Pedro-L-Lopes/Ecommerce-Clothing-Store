import React, { useState } from "react";
import chooseProductSize from "../components/chooseProductSize/chooseProductSize";

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
      TESTE
      <div>
        <chooseProductSize />
      </div>
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
