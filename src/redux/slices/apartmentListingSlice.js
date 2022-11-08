import { createSlice } from "@reduxjs/toolkit";

export const apartmentListingSlice = createSlice({
  name: "apartmentListing",
  initialState: {
    details: {},
    location: {},
    defaultPhoto: "",
    propertyPhotos: [],
    locations: []
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
    updateLocations: (state, { payload }) => {
      state.locations = payload;
    },
  },
});

export const { updateDetails, updateLocation, updateDefaultPhoto, updatePropertyPhotos, updateLocations } =
  apartmentListingSlice.actions;
export default apartmentListingSlice.reducer;
