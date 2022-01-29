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
import { TYPE_CONSTANT } from '../../constant/Web_constant';

const EditStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(clearAccountDetails());
     
      dispatch(
        setAccountConfig({ accounts_configs: TYPE_CONSTANT.ACCOUNTS_CONFIGS })
      );
     
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
