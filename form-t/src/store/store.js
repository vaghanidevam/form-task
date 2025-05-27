import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slice/Formslice';

export const store = configureStore({
  reducer: {
    form:formReducer
  },
});