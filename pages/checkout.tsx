// @ts-nocheck
import { safeJSONParse } from '../components/Shared/Constant/Constant';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { refreshPage } from '../store/feature/authSlice';
import { getCurrencies } from '../store/feature/cartSlice';

import {
  setGeneralConfig,
  setListingConfig,
} from '../store/feature/configsSlice';
import { useRouter } from 'next/router';
import { TYPE_CONSTANT } from '../constant/Web_constant';
import { checkout_page } from '../tradly.config';

const Checkout = () => {
  const [MARKETPLACE_MODULES, setMARKETPLACE_MODULES] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));

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

    const DEFAULT_LISTING_CONFIGS = { listing_pictures_count: 5, enable_slug: false, meta_title: false, meta_description: false, meta_keyword: false, listing_address_enabled: false, show_shipping_charges: false, hide_offer_percent: false, enable_stock: false };
    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS || DEFAULT_LISTING_CONFIGS })
    );

    setMARKETPLACE_MODULES(Number(localStorage.getItem('MARKETPLACE_MODULES')));
  }, [dispatch]);

  return MARKETPLACE_MODULES && checkout_page();
};

export default Checkout;
