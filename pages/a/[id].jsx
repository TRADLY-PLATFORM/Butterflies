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
import { TYPE_CONSTANT } from '../../constant/Web_constant';

const StoreDetails = (props) => {
  const [MARKETPLACE_FLAVOURS, setMARKETPLACE_FLAVOURS] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }

    dispatch(setGeneralConfig({ general_configs: general_configs }));
    setMARKETPLACE_FLAVOURS(
      Number(localStorage.getItem('MARKETPLACE_FLAVOURS'))
    );
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_ACCOUNT_TITLE;
  const pageDescription = TYPE_CONSTANT.META_ACCOUNT_DESCRIPTIONS;

  return (
    MARKETPLACE_FLAVOURS &&
    (MARKETPLACE_FLAVOURS === 1 ? (
      accounts_details_page(pageTitle, pageDescription)
    ) : (
      <DefaultErrorPage statusCode={404} />
    ))
  );
};

export default StoreDetails;
