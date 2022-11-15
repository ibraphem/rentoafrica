import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { controllers } from "../../config/controllers";
import httpRequest from "../../utils/httpRequest";


const initialState = {
  params: {
    pageSize: 12,
    pageNumber: 1,
    search: null,
  },
  loading: false,
  rents: null,
  error: "",
};

export const getRentRequest = createAsyncThunk(
  "rents/fetch",
  async (arg, { getState }) => {
    return httpRequest(
      controllers.rentController + "/List", "post", (getState()?.rentRequest?.params)
    );
  }
);

const rentRequestSlice = createSlice({
  name: "rentRequest",
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
    builder.addCase(getRentRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRentRequest.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.rents = action.payload;
      state.error = "";
    });
    builder.addCase(getRentRequest.rejected, (state, action) => {
      state.loading = false;
      state.rents = {};
      state.error = "Error, Failed to load rents";
    });
  },
});

export default rentRequestSlice.reducer;
export const {
  updatePagination,
  updateSearchTerm,
} = rentRequestSlice.actions;
