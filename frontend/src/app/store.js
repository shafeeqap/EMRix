import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "../features/auth/authSlice";
import layoutReducer from "../layouts/layoutSlice";
import modalReducer from "../components/modal/modalSlice";
import successFeedbackReducer from "../components/successFedback/successFeedbackSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    layout: layoutReducer,
    modal: modalReducer,
    successFeedback: successFeedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
