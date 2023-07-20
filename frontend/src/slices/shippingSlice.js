import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shippingService from "../services/shippingService";

export const fetchShippingByCep = createAsyncThunk(
  "shipping/fetchShippingByCep",
  async (cep, thunkAPI) => {
    try {
      const response = await shippingService.getShippingByCep(cep);
      return response;
    } catch (error) {
      console.error("Erro ao buscar informações do CEP:", error);
      throw error;
    }
  }
);

export const fetchCalculateTermsAndPrice = createAsyncThunk(
  "shipping/fectCalculateTermsAndPrice",
  async (cep, thunkAPI) => {
    try {
      const res = await shippingService.calculatingTermAndPrice(cep);
      return res;
    } catch (error) {
      console.error("Erro ao buscar informações.", error);
      throw error;
    }
  }
);

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    data: {
      localidade: null,
      uf: null,
      logradouro: null,
      bairro: null,
      prazoEPreco: [],
      cep: [],
    },
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingByCep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShippingByCep.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          localidade: action.payload.localidade,
          uf: action.payload.uf,
          logradouro: action.payload.logradouro,
          bairro: action.payload.bairro,
        };
      })
      .addCase(fetchShippingByCep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCalculateTermsAndPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalculateTermsAndPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          prazoEPreco: action.payload,
        };
      })
      .addCase(fetchCalculateTermsAndPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default shippingSlice.reducer;
