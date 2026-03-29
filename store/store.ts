// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { authSlice } from './feature/authSlice';
import { cartSlice } from './feature/cartSlice';
import { categorySlice } from './feature/categorySlice';
import { configsSlice } from './feature/configsSlice';
import { homeSlice } from './feature/homeSlice';
import { listingSlice } from './feature/listingSlice';
import { orderSlice } from './feature/orderSlice';
import { payoutSlice } from './feature/payout';
import { searchSlice } from './feature/search';
import { storeSlice } from './feature/storeSlice';
import { store_orderSlice } from './feature/store_orderSlice';
import { wishSlice } from './feature/wishSlice';

export const makeStore = () =>
  configureStore({
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
      configs: configsSlice.reducer,
      search: searchSlice.reducer,
      wish: wishSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore);
export default store;
