import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { check_login } from '../../constant/check_auth';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import BankDetails from '../../components/mangopay/BankDetails';

const Onboarding = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [router, dispatch]);

  return (
    check_login(router) && (
      <>
        <MainLayout>
          <BankDetails />
        </MainLayout>
      </>
    )
  );
};

export default Onboarding;
