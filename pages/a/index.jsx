/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import AllAccountsPageLayout from '../../components/layouts/PageLayouts/AllAccountsPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import DefaultErrorPage from 'next/error';
import { all_accounts_page } from '../../themes/Theme1';

const Stores = (props) => {
  const [marketplace_module, setmarketplace_module] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(setGeneralConfig(props));
    setmarketplace_module(Number(localStorage.getItem('marketplace_module')));
  }, [dispatch]);

  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;

  return all_accounts_page(pageTitle, pageDescription);
};

export default Stores;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  const response2 = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: {
      seo_text: response?.data?.configs || null,
      general_configs: response2?.data?.configs ||[],
    },
  };
}
