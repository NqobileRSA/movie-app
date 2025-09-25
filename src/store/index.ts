import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import moviesReducer from './slices/moviesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer
});

const persistConfig = { key:'root', storage: AsyncStorage, whitelist:['auth'] };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({serializableCheck:false})
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
