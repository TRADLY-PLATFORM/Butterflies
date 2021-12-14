import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditStorePageLayout from '../../components/layouts/PageLayouts/EditStorePageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import { setAccountConfig } from '../../store/feature/configsSlice';
import tradly from 'tradly';
import { clearAccountDetails } from '../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';

const EditStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(clearAccountDetails());
    dispatch(setAccountConfig(props));
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return (
    <div>
      <MainLayout>{login && <EditStorePageLayout />}</MainLayout>
    </div>
  );
};

export default EditStore;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'accounts',
  });
  return {
    props: { accounts_configs: response?.data?.configs || [] },
  };
}
