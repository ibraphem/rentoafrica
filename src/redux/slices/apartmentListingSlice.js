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
      state.propertyPhotos.push(payload);
    },
    removePropertyPhoto: (state, { payload }) => {
      state.propertyPhotos = state.propertyPhotos?.filter((image) => image !== payload);
    },
    clearPropertyPhoto: (state) => {
      state.propertyPhotos = [];
    },
    updateLocations: (state, { payload }) => {
      state.locations = payload;
    },
  },
});

export const { updateDetails, updateLocation, updateDefaultPhoto, updatePropertyPhotos, removePropertyPhoto, updateLocations } =
  apartmentListingSlice.actions;
export default apartmentListingSlice.reducer;
