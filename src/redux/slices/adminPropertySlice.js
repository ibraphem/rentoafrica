import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";


const initialState = {
  params: {
    pageSize: 10,
    pageNumber: 1,
    id: "",
    search: null,
  },
  loading: false,
  properties: null,
  error: "",
};

export const getAdminProperties = createAsyncThunk(
  "properties/fetch",
  async (arg, { getState }) => {
    return httpRequest(
      controllers.backOfficeController + "/Property/PropertiesByStatus", "post", (getState()?.adminProperties?.params)
    );
  }
);

const adminPropertiesSlice = createSlice({
  name: "adminProperties",
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.params.pageNumber = action.payload;
      state.loading = true;

    },
    updateSearchTerm: (state, action) => {
        state.params.search = action.payload; 
        state.loading = true;
      },
      updateStatus: (state, action) => {
        state.params.id = action.payload; 
        state.loading = true;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = "";
    });
    builder.addCase(getAdminProperties.rejected, (state, action) => {
      state.loading = false;
      state.properties = {};
      state.error = "Error, Failed to load properties";
    });
  },
});

export default adminPropertiesSlice.reducer;
export const {
  updatePagination,
  updateSearchTerm,
  updateStatus
} = adminPropertiesSlice.actions;
