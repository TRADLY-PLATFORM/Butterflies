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
import axios from 'axios';

const EditStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(clearAccountDetails());
    axios.get('/api/configs/accounts').then((res) => {
      dispatch(setAccountConfig({ accounts_configs: res?.configs }));
    });
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return login && edit_store_page();
};

export default EditStore;
