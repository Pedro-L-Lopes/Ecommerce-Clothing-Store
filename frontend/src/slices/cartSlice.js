import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { _id, selectedSize } = action.payload;

      const existingItemIndex = state.findIndex(
        (item) => item._id === _id && item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Se o item já existir, apenas aumente a quantidade
        state[existingItemIndex].quantity += 1;
      } else {
        // Se for um novo item, adicione o cartItemId
        const cartItemId = uuidv4();
        const newItem = {
          ...action.payload,
          cartItemId,
        };
        state.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeCart: (state, action) => {
      const updatedState = state.filter(
        (product) => product.cartItemId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
