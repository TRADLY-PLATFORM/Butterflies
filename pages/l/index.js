/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import ListingsPageLayout from '../../components/layouts/PageLayouts/ListingsPageLayout';
import { refreshPage } from '../../store/feature/authSlice';
import tradly from 'tradly';
import { clearListings } from '../../store/feature/listingSlice';
import { all_listings_page } from '../../themes/Theme1';
import { setGeneralConfig } from '../../store/feature/configsSlice';
  
const AllListings = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearListings());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );

     const general_configs = JSON.parse(
       localStorage.getItem('general_configs')
     );
     dispatch(setGeneralConfig({ general_configs: general_configs }));
  }, [dispatch]);
  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;
  return all_listings_page(pageTitle, pageDescription);
};

export default AllListings;

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'seo',
  });
  return {
    props: { seo_text: response?.data?.configs || null },
  };
}
