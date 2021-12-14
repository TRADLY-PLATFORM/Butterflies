import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import CreateStorePageLayout from '../../components/layouts/PageLayouts/CreateStorePageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setAccountConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';

const createStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(setAccountConfig(props));
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return <MainLayout>{login && <CreateStorePageLayout />}</MainLayout>;
};

export default createStore;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'accounts',
  });
  return {
    props: { accounts_configs: response?.data?.configs || [] },
  };
}
