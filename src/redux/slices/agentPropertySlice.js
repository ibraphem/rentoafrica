import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";


const initialState = {
  params: {
    pageSize: 10,
    pageNumber: 1,
    search: null,
  },
  loading: false,
  properties: null,
  error: "",
};

export const getAgentProperties = createAsyncThunk(
  "properties/fetch",
  async (arg, { getState }) => {
    return httpRequest(
      controllers.propertyController + "/list", "post", (getState()?.agentProperties?.params)
    );
  }
);

const agentPropertiesSlice = createSlice({
  name: "agentProperties",
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.params.pageNumber = action.payload;

    },
    updateSearchTerm: (state, action) => {
        state.params.search = action.payload;
      
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getAgentProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAgentProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = "";
    });
    builder.addCase(getAgentProperties.rejected, (state, action) => {
      state.loading = false;
      state.properties = {};
      state.error = "Error, Failed to load properties";
    });
  },
});

export default agentPropertiesSlice.reducer;
export const {
  updatePagination,
  updateSearchTerm,
} = agentPropertiesSlice.actions;
