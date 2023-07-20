import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const shippingDataSlice = createSlice({
  name: "shippingData",
  initialState,
  reducers: {
    addData: (state, action) => {
      const { data } = action.payload;
      localStorage.setItem("shippingData", JSON.stringify(data));
    },
  },
});

export const { addData } = shippingDataSlice.actions;
export default shippingDataSlice.reducer;
