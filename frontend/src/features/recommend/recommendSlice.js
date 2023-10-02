import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recommendService from "../recommend/recommendService";

const initialState = {
  isRecommend: false,
  isSuccess: false,
  isError: false,
};

export const recommend = createAsyncThunk(
  "recommendations/Recommend",
  async (detail) => {
    try {
      const dataz = await recommendService.Recommend(detail);
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
});

export const { reset } = RecommendationSlice.actions;
export default RecommendationSlice.reducer;
