import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../store/feature/authSlice';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import PayoutPageLayout from '../components/layouts/PageLayouts/PayoutPageLayout';
import { myStore } from '../store/feature/storeSlice';
import { check_login } from '../constant/check_auth';
import { useRouter } from 'next/router';

const Payout = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    if (localStorage.getItem('auth_key')) {
      dispatch(
        myStore({
          prams: {
            page: 1,
            type: 'accounts',
            user_id: userDetails.id,
          },
          authKey: localStorage.getItem('auth_key'),
        })
      );
    }
  }, [localStorage.getItem('auth_key')]);
  return (
    check_login(router) && (
      <MainLayout>
        <PayoutPageLayout />
      </MainLayout>
    )
  );
};

export default Payout;
