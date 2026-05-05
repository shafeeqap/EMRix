import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  isSuccess: false,
};

const successFeedbackSlice = createSlice({
  name: "successFeedback",
  initialState,
  reducers: {
    setSuccessFeedback: (state, action) => {
      state.message = action.payload?.message || null;
      state.isSuccess = true;
    },

    resetSuccessFeedback: (state) => {
        state.message = null;
        state.isSuccess = false;
      },
  },
});

export const { setSuccessFeedback, resetSuccessFeedback } = successFeedbackSlice.actions;
export default successFeedbackSlice.reducer;
