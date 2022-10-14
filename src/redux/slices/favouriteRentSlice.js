import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    rent: []
}

const favoriteRentSlice = createSlice({
    name: 'favoriteRent',
    initialState,
    reducers: {
        addToFavoriteRent: (state, action) => {
            state.rent = [...state.rent, action.payload]
        },
        removeFromFavoriteRent: (state, action) => {
            state.rent = state.rent?.filter((rent) => rent?.id !== action.payload)
        }

    }
})

export default favoriteRentSlice.reducer
export const {addToFavoriteRent, removeFromFavoriteRent} = favoriteRentSlice.actions