import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import productService from "../services/photoService";

const initialState = {
  products: [],
  product: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};
// Publicando produto
export const publishProduct = createAsyncThunk(
  "product/publish",
  async (product, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.publishProduct(product, token);

    // Chechando se tem erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishProduct.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(publishProduct.fulfilled, (state, action) => {
        // Action: dados recebidos do publishProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = false;
        state.product = action.payload;
        state.products.unshift(state.product);
        //Em seguida, state.product é inserido no início do array state.products usando o método unshift(). Isso significa que o valor de state.product será adicionado como o primeiro elemento do array state.products, deslocando os elementos existentes para índices maiores.
        state.message = "Produto adicionado!";
      })
      .addCase(publishProduct.rejected, (state, action) => {
        // Action: dados recebidos do publishProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      });
  },
});

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;
