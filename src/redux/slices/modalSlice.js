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

    confirmPopUp: {
      status: false,
      type: "",
      title: "",
      desc: "",
      payload: null,
      buttonText: "",
      showActionBtn: true
    },

    formModal: {
      status: false,
      title: "",
      type: "",
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

    setConfirmPopUp: (state, { payload }) => {
      state.confirmPopUp = {
        status: payload.status,
        type: payload.type,
        title: payload.title,
        desc: payload.desc,
        payload: payload.payload,
        buttonText: payload.buttonText,
        showActionBtn: payload.showActionBtn
      };
    },

    setFormModal: (state, { payload }) => {
      state.formModal = {
        status: payload.status,
        title: payload.title,
        type: payload.type,
        payload: payload.payload,
      };
    },
  },
});

export const { setAlertModal, setLoader, setConfirmPopUp, setFormModal } = modalSlice.actions;
export default modalSlice.reducer;
