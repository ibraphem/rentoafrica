import { combineReducers } from 'redux';
import apartmentListingSlice from './apartmentListingSlice';
import favouriteRentSlice from './favouriteRentSlice';
import modalSlice from './modalSlice';
import userSlice from './userSlice';


const combinedSlices = combineReducers({
    favoriteRent: favouriteRentSlice,
    modal: modalSlice,
    apartmentListing: apartmentListingSlice,
    user: userSlice

});

export default combinedSlices;
