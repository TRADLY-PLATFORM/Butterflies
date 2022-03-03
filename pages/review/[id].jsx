import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import AddReviewPageLayout from '../../components/layouts/PageLayouts/AddReviewPageLayout';
import OrderDetailsPageLayout from '../../components/layouts/PageLayouts/OrderDetailsPageLayout';
import { check_login } from '../../constant/check_auth';
import { authSelector, refreshPage } from '../../store/feature/authSlice';

const review = () => {
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
        <AddReviewPageLayout />
      </MainLayout>
    )
  );
};

export default review;
