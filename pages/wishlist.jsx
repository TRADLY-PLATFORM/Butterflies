/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tradly from 'tradly';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import WishListPageLayout from '../components/layouts/PageLayouts/WishListPageLayout';
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
  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;
  return (
    check_login(router) && (
      <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
        <WishListPageLayout />
      </MainLayout>
    )
  );
};

export default WishList;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  return {
    props: { seo_text: response?.data?.configs || null },
  };
}
