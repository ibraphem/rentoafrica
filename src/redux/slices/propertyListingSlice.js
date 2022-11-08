import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";


const initialState = {
  params: {
    pageSize: 10,
    pageNumber: 1,
  },
  loading: false,
  properties: null,
  error: "",
};

export const getProperties = createAsyncThunk(
  "properties/fetch",
  async (arg, { getState }) => {
    return httpRequest(
      controllers.listingController + "/Properties", "post", (getState()?.properties?.params)
    );
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.params.pageNumber = action.payload;
      state.loading = true;

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = "";
    });
    builder.addCase(getProperties.rejected, (state, action) => {
      state.loading = false;
      state.properties = {};
      state.error = "Error, Failed to load properties";
    });
  },
});

export default propertiesSlice.reducer;
export const {
  updatePagination
} = propertiesSlice.actions;
