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
    dispatch(setGeneralConfig(props));
    dispatch(setListingConfig(props));
    setmarketplace_type(Number(localStorage.getItem('marketplace_type')));
  }, [dispatch]);

  const pageTitle = props?.seo_text?.meta_listing_title;
  const pageDescription = props?.seo_text?.meta_listing_description;

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

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  const response2 = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  const response3 = await tradly.app.getConfigList({
    paramBody: 'listings',
  });
  return {
    props: {
      seo_text: response?.data?.configs || null,
      general_configs: response2?.data?.configs || [],
      listings_configs: response3?.data?.configs || [],
    },
  };
}
