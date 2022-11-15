import { combineReducers } from 'redux';
import adminPropertySlice from './adminPropertySlice';
import agentPropertySlice from './agentPropertySlice';
import apartmentListingSlice from './apartmentListingSlice';
import corporateSlice from './corporateSlice';
import favouriteRentSlice from './favouriteRentSlice';
import modalSlice from './modalSlice';
import pageSlice from './pageSlice';
import propertyListingSlice from './propertyListingSlice';
import rentRequestSlice from './rentRequestSlice';
import userSlice from './userSlice';


const combinedSlices = combineReducers({
    favoriteRent: favouriteRentSlice,
    modal: modalSlice,
    apartmentListing: apartmentListingSlice,
    user: userSlice,
    page: pageSlice,
    agentProperties: agentPropertySlice,
    adminProperties: adminPropertySlice,
    properties: propertyListingSlice,
    corporates: corporateSlice,
    rentRequest: rentRequestSlice

});

export default combinedSlices;
