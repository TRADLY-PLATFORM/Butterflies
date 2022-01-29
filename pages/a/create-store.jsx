import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import CreateStorePageLayout from '../../components/layouts/PageLayouts/CreateStorePageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setAccountConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { create_store_page } from '../../themes/Theme1';
import axios from 'axios';


const createStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
 
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

  return login && create_store_page();
};

export default createStore;

 