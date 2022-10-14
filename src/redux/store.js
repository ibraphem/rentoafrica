import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combinedSlices from "./slices/combinedSlices";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favoriteRent']
};

const persistedReducer = persistReducer(persistConfig, combinedSlices);


const initStore = () => {
    let store = configureStore({
      reducer: persistedReducer,
    });
    let persistor = persistStore(store)
    return { store, persistor }
  };

export default initStore();