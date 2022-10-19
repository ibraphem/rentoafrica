import { createSlice } from "@reduxjs/toolkit";

export const apartmentListingSlice = createSlice({
  name: "apartmentListing",
  initialState: {
    details: {},
    location: {},
    defaultPhoto: "",
    propertyPhotos: [],
  },

  reducers: {
    updateDetails: (state, { payload }) => {
      state.details = payload;
    },
    updateLocation: (state, { payload }) => {
      state.location = payload;
    },
    updateDefaultPhoto: (state, { payload }) => {
      state.defaultPhoto = payload;
    },
    updatePropertyPhotos: (state, { payload }) => {
      state.propertyPhotos = payload;
    },
  },
});

export const { updateDetails, updateLocation, updateDefaultPhoto, updatePropertyPhotos } =
  apartmentListingSlice.actions;
export default apartmentListingSlice.reducer;
