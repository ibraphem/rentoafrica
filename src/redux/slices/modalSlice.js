import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    alertModal: {
      status: false,
      type: "",
      message: "",
    },

    loader: {
      status: false,
      message: "",
    },

  },

  reducers: { 
   setAlertModal: (state, { payload }) => {
      state.alertModal = {
        status: payload.status,
        type: payload.type,
        message: payload.message,
      };
    },

    setLoader: (state, { payload }) => {
      state.loader = {
        status: payload.status,
        message: payload.message,
      };
    },
  
  },

});



export const {
  setAlertModal,
  setLoader,
} = modalSlice.actions;
export default modalSlice.reducer;
