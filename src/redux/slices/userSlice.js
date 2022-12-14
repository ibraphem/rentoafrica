import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = {}
        }
    }
})

export default userSlice.reducer
export const {saveUser, removeUser} = userSlice.actions
