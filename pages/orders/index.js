import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import OrdersPageLayout from '../../components/layouts/PageLayouts/OrdersPageLayout';
import { check_login } from '../../constant/check_auth';
import { authSelector, refreshPage } from '../../store/feature/authSlice';

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);

  const router = useRouter();

  return (
    check_login(router) && (
      <MainLayout>
        {' '}
        <OrdersPageLayout />{' '}
      </MainLayout>
    )
  );
};

export default Orders;
