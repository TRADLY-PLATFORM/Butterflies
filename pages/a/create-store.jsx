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
import { TYPE_CONSTANT } from '../../constant/Web_constant';

import { check_login } from '../../constant/check_auth';

const createStore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
 
     
      dispatch(setAccountConfig({ accounts_configs:TYPE_CONSTANT.ACCOUNTS_CONFIGS }));
  
  }, [dispatch]);

  const router = useRouter();

  return check_login(router) && create_store_page();
};

export default createStore;

 