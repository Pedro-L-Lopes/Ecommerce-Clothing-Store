import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Pegando detalhes do usuário
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    // Pegando token // Atraves da thunk api pode pegar dados dos services aqui nos slices
    const token = thunkAPI.getState().auth.user.token; // Pegando user do authSlice

    const data = await userService.profile(user, token);

    return data;
  }
);

// Atualizando usuário
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; // Pegando token de authservice

    const data = await userService.updateProfile(user, token); // User da req + token pego em cima

    // Checando erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Pegando detalhes do usuário // Pegando pelo id ao invês do token como é na função "profile"
export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = userService.getUserDetails(id, token);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user", // Nome pelo qual vai ser chamado na store
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        // Action: dados recebidos do profile la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // Action: dados recebidos do updateProfile la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload; // Atualiza os dados do usuário ao valor fornecido na action
        state.message = "Atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        // Tem action pq o dado é a msg de erro
        state.loading = false;
        state.error = action.payload; // Ativa o erro
        state.user = {};
      })
      .addCase(getUserDetails.pending, (state) => {
        // pending = req foi enviada mas não retornou resposta ainda
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        // Action: dados recebidos do profile la em cima (data)
        // fullfield estado e ação // req bem sucedida
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
