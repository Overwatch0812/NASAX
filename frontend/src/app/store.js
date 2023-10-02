import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import recommendationReducer from "../features/recommend/recommendSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    recommendations: recommendationReducer,
  },
});

export default store;
