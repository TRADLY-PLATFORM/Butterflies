import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './feature/authSlice';
import { cartSlice } from './feature/cartSlice';
import { homeSlice } from './feature/homeSlice';
import { listingSlice } from './feature/listingSlice';
 
export default configureStore({
  reducer: {
    home: homeSlice.reducer,
    auth: authSlice.reducer,
    listing:listingSlice.reducer,
    cart:cartSlice.reducer
  },
});
