import { configureStore } from '@reduxjs/toolkit';
import { homeSlice } from './feature/homeSlice';
 
export default configureStore({
  reducer: {
    home:  homeSlice.reducer,
  },
});
