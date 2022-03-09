import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditStorePageLayout from '../../components/layouts/PageLayouts/EditStorePageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import { setAccountConfig } from '../../store/feature/configsSlice';
import tradly from 'tradly';
import { clearAccountDetails } from '../../store/feature/storeSlice';
import { useRouter } from 'next/dist/client/router';
import { edit_store_page } from '../../themes/Theme1';
import { check_login } from '../../constant/check_auth';

const EditStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(clearAccountDetails());
    dispatch(setAccountConfig(props));
  }, [dispatch]);

  const router = useRouter();

  return check_login(router) && edit_store_page();
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
