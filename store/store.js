import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './feature/authSlice';
import { homeSlice } from './feature/homeSlice';
 
export default configureStore({
  reducer: {
    home: homeSlice.reducer,
    auth:authSlice.reducer
  },
});
