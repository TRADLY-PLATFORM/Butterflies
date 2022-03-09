import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { check_login } from '../../constant/check_auth';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import KYC_Document from '../../components/mangopay/KYC_Document';

const onboarding_details = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }
  }, [router]);

  return (
    check_login(router) && (
      <>
        <MainLayout>
          <KYC_Document />
        </MainLayout>
      </>
    )
  );
};

export default onboarding_details;
