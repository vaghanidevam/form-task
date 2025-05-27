
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  form: {},
  formId: null,
};


const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
   setForm: (state, action) => {
      state.form = action.payload;
      state.formId = action.payload._id || null; // Store formId if available
    },
    clearForm: (state) => {
      state.form = {};
    },
    },
})

export const { setForm, clearForm } = formSlice.actions;

export default formSlice.reducer;
