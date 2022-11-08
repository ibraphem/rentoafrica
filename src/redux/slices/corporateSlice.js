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
  corporates: null,
  error: "",
};

export const getCorporates = createAsyncThunk(
  "corporates/fetch",
  async (arg, { getState }) => {
    return httpRequest(
      controllers.backOfficeController + "/Corporate/CorporatesByStatus", "post", (getState()?.corporates?.params)
    );
  }
);

const corporatesSlice = createSlice({
  name: "corporates",
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
    builder.addCase(getCorporates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCorporates.fulfilled, (state, action) => {
      state.loading = false;
      state.corporates = action.payload;
      state.error = "";
    });
    builder.addCase(getCorporates.rejected, (state, action) => {
      state.loading = false;
      state.corporates = {};
      state.error = "Error, Failed to load corporates";
    });
  },
});

export default corporatesSlice.reducer;
export const {
  updatePagination,
  updateSearchTerm,
  updateStatus
} = corporatesSlice.actions;
