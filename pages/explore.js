/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import ListingsPageLayout from '../components/layouts/PageLayouts/ListingsPageLayout';
import { refreshPage } from '../store/feature/authSlice';
import tradly from 'tradly';
import { clearListings } from '../store/feature/listingSlice';
import ExplorePageLayout from '../components/layouts/PageLayouts/ExplorePageLayout';
import { setGeneralConfig } from '../store/feature/configsSlice';
import DefaultErrorPage from 'next/error';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import axios from 'axios';

const explore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearListings());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);
  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;
  return TYPE_CONSTANT.MARKETPLACE_TYPE == 2 ? (
    <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <ExplorePageLayout />
    </MainLayout>
  ) : (
    <DefaultErrorPage statusCode={404} />
  );
};

export default explore;
