import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import { setListingConfig } from '../../store/feature/storeSlice';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditProductPageLayout from '../../components/layouts/PageLayouts/EditProductPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const router = useRouter;

  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(setListingConfig(props));
    dispatch(setGeneralConfig(props));
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return <MainLayout>{login && <EditProductPageLayout />}</MainLayout>;
};

export default EditProduct;

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
