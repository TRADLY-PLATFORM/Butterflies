import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './feature/authSlice';
import { cartSlice } from './feature/cartSlice';
import { categorySlice } from './feature/categorySlice';
import { homeSlice } from './feature/homeSlice';
import { listingSlice } from './feature/listingSlice';
import { orderSlice } from './feature/orderSlice';
import { payoutSlice } from './feature/payout';
import { storeSlice } from './feature/storeSlice';
import { store_orderSlice } from './feature/store_orderSlice';
 
export default configureStore({
  reducer: {
    home: homeSlice.reducer,
    auth: authSlice.reducer,
    listing: listingSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    category: categorySlice.reducer,
    store: storeSlice.reducer,
    store_order: store_orderSlice.reducer,
    payout: payoutSlice.reducer,
  },
});
