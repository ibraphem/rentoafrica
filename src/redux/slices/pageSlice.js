import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: { data: "" },
    reducers: {
        loginRedirect: (state, action) => {
            state.data = action.payload;
        },
    },
});
export const { loginRedirect } = pageSlice.actions;
export const selectLoginRedirectPage = state => state.page.data;

export default pageSlice.reducer;
