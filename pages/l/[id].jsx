/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import MagazineLayout from '../../components/layouts/MainLayouts/MagazineLayout';
import EventDetailsPageLayout from '../../components/layouts/PageLayouts/EventDetailsPageLayout';
import { useDispatch } from 'react-redux';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { clearListingDetails } from '../../store/feature/listingSlice';
import ProductDetailsPageLayout from '../../components/layouts/PageLayouts/ProductDetailsPageLayout';
import {
  setGeneralConfig,
  setListingConfig,
} from '../../store/feature/configsSlice';
import { listing_details_page } from '../../themes/Theme1';
import { TYPE_CONSTANT } from '../../constant/Web_constant';
import axios from 'axios';

function Details(props) {
  const [marketplace_type, setmarketplace_type] = useState(null);

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
   
    setmarketplace_type(Number(localStorage.getItem('marketplace_type')));
  }, [dispatch]);

  const pageTitle = TYPE_CONSTANT.META_LISTING_TITLE;
  const pageDescription = TYPE_CONSTANT.META_LISTING_DESCRIPTION;

  const selectLayout = () => {
    if (marketplace_type === 1) {
      return (
        <ProductDetailsPageLayout
          pageTitle={pageTitle}
          pageDescription={pageDescription}
        />
      );
    } else if (marketplace_type === 2) {
      return (
        <EventDetailsPageLayout
          pageTitle={pageTitle}
          pageDescription={pageDescription}
        />
      );
    }
  };

  return listing_details_page(pageTitle, pageDescription);
}

export default Details;
