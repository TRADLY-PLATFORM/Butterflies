/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import AllAccountsPageLayout from '../../components/layouts/PageLayouts/AllAccountsPageLayout';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import DefaultErrorPage from 'next/error';
import AccountDetailsPageLayout from '../../components/layouts/PageLayouts/AccountDetailsPageLayout';
import { accounts_details_page } from '../../themes/Theme1';

const StoreDetails = (props) => {
  const [marketplace_module, setmarketplace_module] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(setGeneralConfig(props));
    setmarketplace_module(Number(localStorage.getItem('marketplace_module')));
  }, [dispatch]);

  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;

  return (
    marketplace_module &&
    (marketplace_module === 1 ? (
      accounts_details_page(pageTitle, pageDescription)
    ) : (
      <DefaultErrorPage statusCode={404} />
    ))
  );
};

export default StoreDetails;

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
      general_configs: response2?.data?.configs || [],
    },
  };
}
