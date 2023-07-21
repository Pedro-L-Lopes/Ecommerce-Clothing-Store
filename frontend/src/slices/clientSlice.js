import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "../services/clientService";

const initialState = {
  client: {},
  error: false,
  success: false,
  loading: false,
};

export const insertClient = createAsyncThunk(
  "client/insert",
  async (client, thunkAPI) => {
    const data = await clientService.insertClient(client);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertClient.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(insertClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.client = action.payload;
      })
      .addCase(insertClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.client = null; 
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
