import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import productService from "../services/productService";

const initialState = {
  products: [],
  product: {},
  error: false,
  success: false,
  loading: false,
  message: null,
  cartItems: ["teste"],
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

// Pegando produtos do usuário
export const getUserProducts = createAsyncThunk(
  "product/userproduct",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.getUserProducts(id, token);

    return data;
  }
);

// Deletando produto
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.deleteProduct(id, token);

    // Checando erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Atualizando produto
export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.updateProduct(
      {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        size: productData.size,
        onSale: productData.onSale,
        salePrice: productData.salePrice,
        available: productData.available,
        category: productData.category,
      },
      productData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Pegando o produto pelo id
export const getProduct = createAsyncThunk("product/getproduct", async (id) => {
  const data = await productService.getProduct(id);

  return data;
});

// Pegando todos os produtos
export const getAllProducts = createAsyncThunk("product/getail", async () => {
  const data = await productService.getAllProducts();

  return data;
});

// Buscando produtos pelo nome
export const searchProducts = createAsyncThunk(
  "product/search",
  async (query) => {
    const data = await productService.searchProducts(query);

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
      })
      .addCase(getUserProducts.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        // Action: dados recebidos do getUserProducts la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Action: dados recebidos do deleteProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = state.products.filter((product) => {
          return product._id !== action.payload.id; // Se for diferente retorna a foto, senão exclui ela
        });

        state.message = action.payload.message; // Message que vem da api
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        // Action: dados recebidos do deleteProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      })
      .addCase(updateProduct.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Action: dados recebidos do updateProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products.map((product) => {
          if (product._id === action.payload.product._id) {
            return (product.name = action.payload.product.name);
          }
          return product;
        });

        state.message = action.payload.message; // Message que vem da api
      })
      .addCase(updateProduct.rejected, (state, action) => {
        // Action: dados recebidos do updateProduct la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      })
      .addCase(getProduct.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        // Action: dados recebidos do getUserProducts la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        // Action: dados recebidos do getUserProducts la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        // Action: dados recebidos do getUserProducts la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      });
  },
});

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;
