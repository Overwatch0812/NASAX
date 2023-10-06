import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { isAuthenticated } from "./authService";

const user = localStorage.getItem("access");

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: user ? true : false,
  isLoading: false,
  isUserLoaded: false,
  isProjectApiFetched: false,
  message: "",
};

// for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      return await authService.signup(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.login(userData);
      if (!data.access) {
        console.log("No ACCESS");
      } else {
      }
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// for activation
export const activate = createAsyncThunk(
  "auth/activate",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.activate(userData);
      if (!data) {
        console.log("Not activated");
      } else {
      }
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for user loaded
export const load = createAsyncThunk("auth/load", async () => {
  try {
    const data = await authService.load_user();
    if (!data) {
      console.log("User Not loaded");
    }
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const email_for_reset_pass = createAsyncThunk(
  "auth/reset_password",
  async (email) => {
    try {
      const response = await authService.reset_password(email);
      if (!response) {
        console.log("User Not loaded");
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (data, thunkAPI) => {
    try {
      const dataz = await authService.resetPasswordConfirmz(data);
      if (!dataz) {
        console.log("Cannot change Password");
      }
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isUserLoaded = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(activate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(activate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(load.pending, (state) => {
        state.isLoading = true;
        state.isUserLoaded = false;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.isUserLoaded = true;
        state.user = action.payload;
      })
      .addCase(load.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isUserLoaded = false;
        state.user = null;
      })
      .addCase(email_for_reset_pass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(email_for_reset_pass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(email_for_reset_pass.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(resetPasswordConfirm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordConfirm.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = action.payload;
        state.isUserLoaded = false;
        state.message = "Done";
      })
      .addCase(resetPasswordConfirm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.isUserLoaded = false;
        state.message = false;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
