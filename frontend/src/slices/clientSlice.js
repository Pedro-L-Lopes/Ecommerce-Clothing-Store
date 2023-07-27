import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "../services/clientService";
import orderSlice from "./orderSlice";

const client = JSON.parse(localStorage.getItem("client"));

const initialState = {
  clients: [],
  client: {},
  clientId: null,
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

export const getClientById = createAsyncThunk("client/get", async (id) => {
  const data = await clientService.getClientById(id);

  return data;
});

export const getAllClients = createAsyncThunk("orders/getall", async () => {
  const data = await clientService.getAllClients();
  return data;
});

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
        state.clients.unshift(state.client);
        state.clientId = action.payload.id;
      })
      .addCase(insertClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.client = null;
        state.clientId = null;
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.client = action.payload;
      })
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.clients = action.payload;
      });
  },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
