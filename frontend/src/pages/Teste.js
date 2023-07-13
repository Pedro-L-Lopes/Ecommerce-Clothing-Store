import React, { useState } from "react";
import chooseProductSize from "../components/chooseProductSize/chooseProductSize";

const SelectWithHover = () => {
  const [tags, setTags] = useState("");

  const tagsArray = tags.split(",");

  console.log(tags);
  console.log(tagsArray);

  return (
    <div>
      TESTE
      <div>
        <div className="mb-4">
          <span className="text-white dark:text-gray-200">Tags</span>
          <input
            required
            placeholder="Separe as tags por virgula"
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
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
