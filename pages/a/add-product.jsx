/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import AddProductPageLayout from '../../components/layouts/PageLayouts/AddProductPageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setListingConfig } from '../../store/feature/storeSlice';
import AddEventPageLayout from '../../components/layouts/PageLayouts/AddEventPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';

const AddProduct = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(setListingConfig(props));
    dispatch(setGeneralConfig(props));
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return (
    <MainLayout>
      {/* <AddProductPageLayout/> */}
      {login && <AddEventPageLayout />}
    </MainLayout>
  );
};

export default AddProduct;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'listings',
  });
  const response2 = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: {
      listing_configs: response?.data?.configs || [],
      general_configs: response2?.data?.configs || [],
    },
  };
}
