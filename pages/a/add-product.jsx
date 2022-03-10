/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import AddProductPageLayout from '../../components/layouts/PageLayouts/AddProductPageLayout';
import { authSelector, refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { setListingConfig } from '../../store/feature/storeSlice';
import AddEventPageLayout from '../../components/layouts/PageLayouts/AddEventPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { add_listing_page } from '../../themes/Theme1';
import axios from 'axios';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { check_login } from '../../constant/check_auth';

const AddProduct = (props) => {
  const dispatch = useDispatch();
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

  const router = useRouter();

  return check_login(router) && add_listing_page();
};

export default AddProduct;
