import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import CreateStorePageLayout from '../../components/layouts/PageLayouts/CreateStorePageLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setAccountConfig } from '../../store/feature/configsSlice';

const createStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
	  );
	  dispatch(setAccountConfig(props))
  }, [dispatch]);

  return (
    <MainLayout>
      <CreateStorePageLayout />
    </MainLayout>
  );
};

export default createStore;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'accounts',
  });
  return {
    props: { accounts_configs: response?.data?.configs||[] },
  };
}
