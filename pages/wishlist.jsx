/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tradly from 'tradly';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import WishListPageLayout from '../components/layouts/PageLayouts/WishListPageLayout';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import { refreshPage } from '../store/feature/authSlice';
import { clearWishState } from '../store/feature/wishSlice';
import axios from 'axios';

import { check_login } from '../constant/check_auth';
import { refreshPage } from '../store/feature/authSlice';
import { clearWishState } from '../store/feature/wishSlice';

const WishList = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearWishState());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);
  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;
  return (
    check_login(router) && (
      <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
        <WishListPageLayout />
      </MainLayout>
    )
  );
};

export default WishList;
