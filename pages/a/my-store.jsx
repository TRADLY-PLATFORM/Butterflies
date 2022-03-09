/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import MyStorePageLayout from '../../components/layouts/PageLayouts/MyStorePageLayout';
import { check_login } from '../../constant/check_auth';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import { my_store_page } from '../../themes/Theme1';

const MyStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      if (localStorage.getItem('refresh_key')) {
        dispatch(
          refreshPage({
            key: localStorage.getItem('refresh_key'),
          })
        );
      }
    }
  }, [dispatch]);

  const router = useRouter();

  return check_login(router) && my_store_page();
};

export default MyStore;
