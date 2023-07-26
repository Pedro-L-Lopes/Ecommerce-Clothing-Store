import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

const initialState = {
  orders: [],
  order: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (order, thunkAPI) => {
    const data = await orderService.createOrder(order);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getAllOrders = createAsyncThunk("orders/getAll", async (token) => {
  const data = await orderService.getAllOrders(token);
  return data;
});

export const updateOrder = createAsyncThunk(
  "order/update",
  async (orderData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await orderService.updateOrder(
      {
        status: orderData.status,
        observation: orderData.observation,
      },
      orderData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getOrderById = createAsyncThunk(
  "order/getorderbyid",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await orderService.getOrderById(id, token);

    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.order = action.payload;
        state.orders.unshift(state.order);
        state.message = "Pedido feito com sucesso!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.order = {};
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.orders.map((order) => {
          if (order._id === action.payload.order._id) {
            return (order.status = action.payload.order.status);
          }
          return order;
        });

        state.message = action.payload.message;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.order = {};
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.order = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
