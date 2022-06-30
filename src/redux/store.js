import { configureStore } from '@reduxjs/toolkit';
import auth from './states/auth';

export const store = configureStore({
  reducer: {
    auth,
  },
});

export default store;
