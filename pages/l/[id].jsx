/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import { clearListingDetails } from '../../store/feature/listingSlice';
import {
  setGeneralConfig,
  setListingConfig,
} from '../../store/feature/configsSlice';
import { listing_details_page } from '../../tradly.config';
import { TYPE_CONSTANT } from '../../constant/Web_constant';

function Details() {
  const [MARKETPLACE_MODULES, setMARKETPLACE_MODULES] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      if (localStorage.getItem('refresh_key')) {
        dispatch(
          refreshPage({
            key: localStorage.getItem('refresh_key'),
          })
        );
      }
    }
    dispatch(clearListingDetails());
    const general_configs = JSON.parse(localStorage.getItem('general_configs'));

    dispatch(setGeneralConfig({ general_configs: general_configs }));

    dispatch(
      setListingConfig({ listing_configs: TYPE_CONSTANT.LISTINGS_CONFIGS })
    );

    setMARKETPLACE_MODULES(Number(localStorage.getItem('MARKETPLACE_MODULES')));
  }, [dispatch]);

  return listing_details_page();
}

export default Details;
