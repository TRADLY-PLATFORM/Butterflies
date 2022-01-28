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


const AddProduct = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));

    axios.get('/api/configs/listings').then((res) => {
      dispatch(setListingConfig({ listings_configs: res?.configs }));
    });
  }, [dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const { login } = useSelector(authSelector);

  return login && add_listing_page();
};

export default AddProduct;
 