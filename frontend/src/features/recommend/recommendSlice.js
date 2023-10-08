import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recommendService from "../recommend/recommendService";

const initialState = {
  isRecommend: false,
  isSuccess: false,
  isError: false,
};

export const recommend = createAsyncThunk(
  "recommendations/Recommend",
  async (id) => {
    try {
      const dataz = await recommendService.Recommend(id);
      if (!dataz) {
        console.log("Cannot Access Api");
      }
      return dataz;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const RecommendationSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isRecommend = false),
        (state.isError = false),
        (state.isSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommend.pending, (state) => {
        (state.isRecommend = true),
          (state.isSuccess = false),
          (state.isError = false);
      })
      .addCase(recommend.fulfilled, (state, action) => {
        (state.isRecommend = action.payload),
          (state.isSuccess = true),
          (state.isError = false);
      })
      .addCase(recommend.rejected, (state, action) => {
        (state.isRecommend = false),
          (state.isFetched = false),
          (state.isError = action.payload);
      });
  },
});

export const { reset } = RecommendationSlice.actions;
export default RecommendationSlice.reducer;
