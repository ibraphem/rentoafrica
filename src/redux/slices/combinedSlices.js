import { combineReducers } from 'redux';
import favouriteRentSlice from './favouriteRentSlice';
import modalSlice from './modalSlice';


const combinedSlices = combineReducers({
    favoriteRent: favouriteRentSlice,
    modal: modalSlice

});

export default combinedSlices;
