/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import HomePageLayout from '../components/layouts/PageLayouts/HomePageLayout';
import { refreshPage } from '../store/feature/authSlice';
import tradly from 'tradly';
import { setGeneralConfig } from '../store/feature/configsSlice';
import { home_page } from '../themes/Theme1';
import { TYPE_CONSTANT } from '../constant/Web_constant';

const Index = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }

    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;

  return home_page(pageTitle, pageDescription);
};

export default Index;
