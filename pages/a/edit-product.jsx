import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import { setListingConfig } from '../../store/feature/storeSlice';
import tradly from 'tradly';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import EditProductPageLayout from '../../components/layouts/PageLayouts/EditProductPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { edit_listing_page } from '../../themes/Theme1';
import axios from 'axios';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

import { check_login } from '../../constant/check_auth';

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));

    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS })
    );
  }, [dispatch]);

  return check_login(router) && edit_listing_page();
};

export default EditProduct;
