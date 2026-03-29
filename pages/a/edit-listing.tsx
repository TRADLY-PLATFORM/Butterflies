// @ts-nocheck
import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import {
  clearAccountListingDetails,
  setListingConfig,
} from '../../store/feature/storeSlice';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import { useRouter } from 'next/router';
import { edit_listing_page } from '../../tradly.config';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import { check_login } from '../../constant/check_auth';
import { check_flavours } from '../../constant/check_flavours';
import Error from 'next/error';

const EditListing = () => {
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

    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));
    const DEFAULT_LISTING_CONFIGS = { listing_pictures_count: 5, enable_slug: false, meta_title: false, meta_description: false, meta_keyword: false, listing_address_enabled: false, show_shipping_charges: false, hide_offer_percent: false, enable_stock: false };
    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS || DEFAULT_LISTING_CONFIGS })
    );
  }, [dispatch]);

  useEffect(() => {
    const handleStart = (url) => {
      dispatch(clearAccountListingDetails());
    };

    router.events.on('routeChangeStart', handleStart);
  }, [router]);

  return check_flavours(2) ? (
    <Error statusCode={404} />
  ) : (
    check_login(router) && edit_listing_page()
  );
};

export default EditListing;
