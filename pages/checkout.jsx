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

const Checkout = (props) => {
  const [marketplace_type, setmarketplace_type] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      refreshPage({
        key: localStorage.getItem('refresh_key'),
      })
    );
    dispatch(
      getCurrencies({
        authKey: localStorage.getItem('auth_key'),
      })
    );
    dispatch(setGeneralConfig(props));
    dispatch(setListingConfig(props));
    setmarketplace_type(Number(localStorage.getItem('marketplace_type')));
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/');
    }
  }, [localStorage.getItem('login')]);

  const pageTitle = props?.seo_text?.meta_title;
  const pageDescription = props?.seo_text?.meta_description;

  const { login } = useSelector(authSelector);

  const selectLayout = () => {
    if (login) {
      if (marketplace_type === 1) {
        return <CheckoutPageLayout />;
      } else {
        return <EventCheckoutPageLayout />;
      }
    }
  };

  return (
    marketplace_type && (
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
