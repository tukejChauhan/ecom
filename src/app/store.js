import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import { productReducer } from '../features/reducer';

export const store = configureStore({
  reducer: {
    productReducer
  },
});
