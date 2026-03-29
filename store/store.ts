// @ts-nocheck
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
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

const combinedReducer = combineReducers({
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
});

// Handle HYDRATE action from next-redux-wrapper: merge server state into client store
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combinedReducer(state, action);
};

export const makeStore = () =>
  configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore);
export default store;
