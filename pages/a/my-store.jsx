/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import MyStorePageLayout from '../../components/layouts/PageLayouts/MyStorePageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';

const MyStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);

  const router=useRouter()

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return <MainLayout>{login && <MyStorePageLayout />}</MainLayout>;
};

export default MyStore;
