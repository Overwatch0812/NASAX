import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: null,
  projectDetail: null,
  isFetched: false,
  isFetching: false,
  isErrror: false,
};

export const fetchProjectApiData = createAsyncThunk(
  "projects/ProjectApi",
  async () => {
    try {
      const dataz = await projectService.fetchProjectData();
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

export const fetchProjectDetail = createAsyncThunk(
  "projects/ProjectDetail",
  async (id) => {
    try {
      const dataz = await projectService.FetchProjectDetail(id);
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
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => {
      (state.projects = null),
        (state.projectDetail = null),
        (state.isFetched = false),
        (state.isErrror = false),
        (state.isFetching = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectApiData.pending, (state) => {
        (state.projects = null),
          (state.isFetching = true),
          (state.isFetched = false),
          (state.isErrror = false);
      })
      .addCase(fetchProjectApiData.fulfilled, (state, action) => {
        (state.projects = action.payload),
          (state.isFetching = false),
          (state.isFetched = true),
          (state.isErrror = false);
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        (state.projects = null),
          (state.isFetching = false),
          (state.isFetched = false),
          (state.isErrror = true);
      })
      .addCase(fetchProjectDetail.pending, (state) => {
        (state.projects = null),
          (state.projectDetail = null),
          (state.isFetching = true),
          (state.isFetched = false),
          (state.isErrror = false);
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        (state.projects = null),
          (state.isFetching = false),
          (state.projectDetail = action.payload),
          (state.isFetched = true),
          (state.isErrror = false);
      })
      .addCase(fetchProjectApiData.rejected, (state, action) => {
        (state.projects = null),
          (state.isFetching = false),
          (state.projectDetail = null),
          (state.isFetched = false),
          (state.isErrror = true);
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
