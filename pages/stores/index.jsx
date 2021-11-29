import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import AllAccountsPageLayout from '../../components/layouts/PageLayouts/AllAccountsPageLayout';

const Stores = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
  }, [dispatch]);

  return (
    <MainLayout>
      <AllAccountsPageLayout />
    </MainLayout>
  );
};

export default Stores;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  return {
    props: { seo_text: response?.data?.configs },
  };
}
