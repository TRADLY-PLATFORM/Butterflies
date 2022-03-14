/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MagazineLayout from '../components/layouts/MainLayouts/MagazineLayout';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import CheckoutPageLayout from '../components/layouts/PageLayouts/CheckoutPageLayout';
import { authSelector, refreshPage } from '../store/feature/authSlice';
import { getCurrencies } from '../store/feature/cartSlice';
import tradly from 'tradly';
import EventCheckoutPageLayout from '../components/layouts/PageLayouts/EventCheckoutPageLayout';
import {
  setGeneralConfig,
  setListingConfig,
} from '../store/feature/configsSlice';
import { useRouter } from 'next/dist/client/router';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import axios from 'axios';
import { check_login } from '../constant/check_auth';

const Checkout = (props) => {
  const [MARKETPLACE_MODULES, setMARKETPLACE_MODULES] = useState(null);
  const router = useRouter();

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

    dispatch(
      getCurrencies({
        authKey: localStorage.getItem('auth_key'),
      })
    );

    dispatch(setGeneralConfig({ general_configs: general_configs }));

    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS })
    );

    setMARKETPLACE_MODULES(Number(localStorage.getItem('MARKETPLACE_MODULES')));
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_TITLE;
  const pageDescription = TYPE_CONSTANT.META_DESCRIPTIONS;

  const selectLayout = () => {
    if (check_login(router)) {
      if (MARKETPLACE_MODULES === 1) {
        return <CheckoutPageLayout />;
      } else {
        return <EventCheckoutPageLayout />;
      }
    }
  };

  return (
    MARKETPLACE_MODULES && (
      <>
        <div className="">
          <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
            {selectLayout()}
          </MainLayout>
        </div>
      </>
    )
  );
};

export default Checkout;
