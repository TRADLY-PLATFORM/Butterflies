/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../components/layouts/MainLayouts/MainLayout';
import ListingsPageLayout from '../components/layouts/PageLayouts/ListingsPageLayout';
import { refreshPage } from '../store/feature/authSlice';
import tradly from 'tradly';
import { clearListings } from '../store/feature/listingSlice';
import ExplorePageLayout from '../components/layouts/PageLayouts/ExplorePageLayout';
import { setGeneralConfig } from '../store/feature/configsSlice';
import DefaultErrorPage from 'next/error';


const explore = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearListings());
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
      );
       dispatch(setGeneralConfig(props));
  }, [dispatch]);
  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;
  return props.general_configs?.type == 2 ? (
    <MainLayout pageTitle={pageTitle} pageDescription={pageDescription}>
      <ExplorePageLayout />
    </MainLayout>
  ) : (
    <DefaultErrorPage statusCode={404} />
  );
};

export default explore;

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
